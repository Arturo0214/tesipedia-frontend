import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as requestService from './requestService';

const initialState = {
  userRequests: {}, 
  error: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createRequest = createAsyncThunk('requests/create', async (requestData, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    if (!user) {
      throw new Error('Debes iniciar sesión para crear una nueva solicitud')
    }
    const token = user.token
    const newRequest = await requestService.createRequest(requestData, token)

    // Actualizar el estado con la nueva solicitud
    thunkAPI.dispatch(addRequestForUser({ userId: user._id, request: newRequest }))
        // Actualizar el estado con el nuevo ID de solicitud
    return newRequest;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const cancelRequest = createAsyncThunk('requests/cancel', async (requestId, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user
    if (!user) {
      throw new Error('Debes iniciar sesión para cancelar una solicitud')
    }
    const token = user.token
    await requestService.cancelRequest(requestId, token)

    // Actualizar el estado eliminando la solicitud cancelada
    thunkAPI.dispatch(removeRequestForUser({ userId: user._id, requestId }))

    return requestId
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
});

export const loadUserRequests = createAsyncThunk('requests/loadUserRequests', async (userId) => {
  try {
    const response = await requestService.getUserRequests(userId) // Hacer una llamada al backend para cargar las solicitudes
    return { userId, requests: response.data }
  } catch (error) {
    // Manejo de errores
  }
});

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    reset: (state) => initialState,
    addRequestForUser: (state, action) => {
      const { userId, request } = action.payload;
      state.userRequests[userId] = [...(state.userRequests[userId] || []), request]
    },
    removeRequestForUser: (state, action) => {
      const { userId, requestId } = action.payload
      state.userRequests[userId] = state.userRequests[userId].filter(request => request._id !== requestId)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        const { userId, request } = action.payload
        state.userRequests[userId] = [...(state.userRequests[userId] || []), request]
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.isLoading = false
        state.error = true
        state.message = action.payload
      })
      .addCase(cancelRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(cancelRequest.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(cancelRequest.rejected, (state, action) => {
        state.isLoading = false
        state.error = true
        state.message = action.payload
      })
      .addCase(loadUserRequests.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loadUserRequests.fulfilled, (state, action) => {
        state.isLoading = false
        const { userId, requests } = action.payload
        state.userRequests[userId] = requests
      })
      .addCase(loadUserRequests.rejected, (state, action) => {
        state.isLoading = false
        state.error = true
        state.message = action.payload.error.message || 'Error al cargar las solicitudes del usuario'
      });
  },
})

export const { reset, addRequestForUser, removeRequestForUser } = requestSlice.actions
export default requestSlice.reducer
