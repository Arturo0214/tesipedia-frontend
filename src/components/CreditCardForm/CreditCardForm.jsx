import React, { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';

const CreditCardForm = ({ handlePaymentSubmit }) => {
  const stripe = useStripe();
  const elements = useElements();
  

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expirationMonth: '',
    expirationYear: '',
    cvc: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.cardNumber.trim()) {
      errors.cardNumber = 'El número de tarjeta es obligatorio';
    }

    if (!formData.cardholderName.trim()) {
      errors.cardholderName = 'El nombre del titular es obligatorio';
    }

    if (!formData.expirationMonth.trim() || !formData.expirationYear.trim()) {
      errors.expiration = 'La fecha de vencimiento es obligatoria';
    } else {
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      const enteredYear = parseInt(formData.expirationYear, 10);
      const enteredMonth = parseInt(formData.expirationMonth, 10);

      if (
        enteredYear < currentYear ||
        (enteredYear === currentYear && enteredMonth < currentMonth)
      ) {
        errors.expiration = 'La tarjeta ha vencido';
      }
    }

    if (!formData.cvc.trim()) {
      errors.cvc = 'El código de seguridad es obligatorio';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js o Elements no se han cargado todavía.
      // Asegúrate de deshabilitar el envío del formulario hasta que estén disponibles.
      return;
    }

    setIsLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement('card'), // Obtén el elemento de tarjeta desde Elements
      billing_details: {
        name: formData.cardholderName,
        // Puedes agregar más detalles de facturación aquí si es necesario
      },
    });

    if (error) {
      console.error(error);
      // Maneja el error adecuadamente
    } else {
      // Envía el paymentMethod a la función handlePaymentSubmit
      handlePaymentSubmit(paymentMethod);
    }

    setIsLoading(false);
  };

  
  const validateCardType = () => {
    const cardNumber = formData.cardNumber.replace(/\s+/g, '');
    const visaPattern = /^4/;
    const mastercardPattern = /^5[1-5]/;
    const amexPattern = /^3[47]/;

    if (visaPattern.test(cardNumber)) {
      return 'Visa';
    } else if (mastercardPattern.test(cardNumber)) {
      return 'MasterCard';
    } else if (amexPattern.test(cardNumber)) {
      return 'American Express';
    } else {
      return 'Desconocido';
    }
  };

  const cardType = validateCardType();


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Tipo de Tarjeta</label>
        <input
          type="text"
          name="cardType"
          className="form-control"
          value={cardType}
          readOnly
        />
      </div>

      <div className="form-group">
        <label>Nombre del Titular</label>
        <input
          type="text"
          name="cardholderName"
          className={`form-control ${
            errors.cardholderName ? 'is-invalid' : ''
          }`}
          value={formData.cardholderName}
          onChange={handleInputChange}
        />
        {errors.cardholderName && (
          <div className="invalid-feedback">{errors.cardholderName}</div>
        )}
      </div>

      <div className="form-group">
        <label>Número de Tarjeta</label>
        <input
          type="text"
          name="cardNumber"
          className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
          value={formData.cardNumber}
          placeholder="4152 5678 9012 3456"
          onChange={handleInputChange}
        />
        {errors.cardNumber && (
          <div className="invalid-feedback">{errors.cardNumber}</div>
        )}
      </div>

      <div className="form-group">
        <label>Fecha de Vencimiento (MM/YY)</label>
        <div className="d-flex">
          <input
            type="text"
            name="expirationMonth"
            placeholder="MM"
            className={`form-control ${
              errors.expiration ? 'is-invalid' : ''
            } mr-2`}
            value={formData.expirationMonth}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="expirationYear"
            placeholder="YY"
            className={`form-control ${
              errors.expiration ? 'is-invalid' : ''
            } mr-2`}
            value={formData.expirationYear}
            onChange={handleInputChange}
          />
        </div>
        {errors.expiration && (
          <div className="invalid-feedback">{errors.expiration}</div>
        )}
      </div>

      <div className="form-group">
        <label>Código de Seguridad (CVC)</label>
        <input
          type="text"
          name="cvc"
          className={`form-control ${errors.cvc ? 'is-invalid' : ''}`}
          value={formData.cvc}
          onChange={handleInputChange}
        />
        {errors.cvc && <div className="invalid-feedback">{errors.cvc}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
        Pagar
      </button>
    </form>
  );
};

export default CreditCardForm;