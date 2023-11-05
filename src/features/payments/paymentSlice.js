import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createPayment,
  getPaymentById,
  updatePaymentStatus,
  cancelPayment,
  completePayment,
} from './paymentService';

const initialState = {
  userPayments: {},
  error: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createPaymentAsync = createAsyncThunk('payments/createPayment', async (paymentData, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;

    if (!user) {
      throw new Error('Debes iniciar sesión para crear un nuevo pago');
    }

    const token = user.token;
    const newPayment = await createPayment(paymentData, token);
    thunkAPI.dispatch(addPaymentForUser({ userId: user._id, payment: newPayment }));
    return newPayment;
    
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const getPaymentByIdAsync = createAsyncThunk('payments/getPaymentById', async (paymentId) => {
  const response = await getPaymentById(paymentId);
  return response.payment;
});

export const updatePaymentStatusAsync = createAsyncThunk(
  'payment/updatePaymentStatus',
  async ({ paymentId, status }) => {
    const response = await updatePaymentStatus(paymentId, status);
    return response.payment;
  }
);

export const cancelPaymentAsync = createAsyncThunk('payment/cancelPayment', async (paymentId) => {
  const response = await cancelPayment(paymentId);
  return response.payment;
});

export const completePaymentAsync = createAsyncThunk('payment/completePayment', async (paymentId) => {
  const response = await completePayment(paymentId);
  return response.payment;
});


const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    reset: (state) => initialState,
    addPaymentForUser: (state, action) => {
      const { userId, payment } = action.payload;
      state.userPayments[userId] = [...(state.userPayments[userId] || []), payment];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(createPaymentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getPaymentByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(getPaymentByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePaymentStatusAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentStatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(updatePaymentStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(cancelPaymentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelPaymentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(cancelPaymentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(completePaymentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completePaymentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(completePaymentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { reset, addPaymentForUser } = paymentSlice.actions;

export default paymentSlice.reducer;
