import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify'
import { createPaymentAsync } from "../../features/payments/paymentSlice";
import Spinner from "../Spinner/Spinner";
import './checkoutForm.css'

export default function CheckoutForm({ cotizacion, costo }) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    request: cotizacion._id,
    currency: "MXN",
    metodoPago: "card",
    name: '',
  });

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      costo: costo,
    }));
  }, [costo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe no está configurado correctamente.");
      return;
    }

    if (!cotizacion || !cotizacion._id) {
      console.error("La cotización es inválida o no tiene un ID válido.");
      return;
    }

    // Verifica que el costo sea un número válido
    if (isNaN(formData.costo)) {
      console.error("El costo no es un número válido.");
      return;
    }

    // Convierte el costo a centavos (o la moneda más pequeña que estés usando)
    const amountInCents = Math.round(parseFloat(formData.costo) * 100);

    // Crea un objeto con los detalles del pago
    const paymentData = {
      request: cotizacion._id,
      currency: formData.currency,
      metodoPago: "card",
      costo: amountInCents, // Usa el costo en centavos
    };

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;
      try {
        const response = await dispatch(createPaymentAsync({ ...paymentData, id }));
        console.log("Respuesta del servidor:", response);
        if (response.payload) {
          console.log("Datos del pago exitoso:", response.payload);

          setTimeout(() => {
            setLoading(false);
            navigate('/seguimiento');
          }, 1000);

          toast.success("Su pago fue exitoso!, redirigiendo...")
        } else if (response.error) {
          toast.error(`Datos incorrectos: ${response.error}`)
          console.error("Detalles del error:", response.error);
        } else {
          console.error("Respuesta inesperada del servidor");
        }
      } catch (error) {
        console.error("Error al crear el pago:", error.message);
        console.error("Ocurrió un error al procesar el pago:", error);
      }
    } else {
      console.error("Error al crear el método de pago:", error.message);
      console.error("Detalles del error:", error);

      if (error.type === "validation_error") {
        console.error("Error de validación:", error.message);
      } else if (error.type === "authentication_error") {
        console.error("Error de autenticación:", error.message);
      } else {
        console.error("Error desconocido:", error.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isFormValid = formData.name && formData.costo;

  if (loading) {
    return <Spinner />
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Titular de la tarjeta:</label>
      <input
        className="form-control"
        type="text"
        id="name"
        name="name"
        value={formData.name || ""}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="cardNumber">Datos de la tarjeta:</label>
      <CardElement
        id="cardElement"
        className="form-control col"
        options={{
          style: {
            base: {
              fontSize: '17.5px',
              color: 'black',
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <label htmlFor="costo">Monto total:</label>
      <p
        className="text-center"
        type="text" // Cambiado a texto ya que el costo se establece desde el prop
        name="costo"
        value={formData.costo} 
        readOnly 
        required
      >
        <strong>{formData.costo}</strong>
      </p>
      <button type="submit" className="btn btn-primary mt-3" disabled={!isFormValid}>
        Pagar
      </button>
    </form>
  );
}