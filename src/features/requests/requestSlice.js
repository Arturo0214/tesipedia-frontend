import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import requestService from './requestService'

const initialState = {
  requests: [],
  error: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createRequest = createAsyncThunk('requests/create', async (requestData, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    if (!user) {
      throw new Error('Debes iniciar sesión para crear una nueva solicitud');
    }
    const token = user.token;
    return await requestService.createRequest(requestData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getRequests = createAsyncThunk('requests/get', async (_, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user
    if (!user) {
      throw new Error('Debes iniciar sesión para obtener las solicitudes')
    }
    const token = user.token;
    return await requestService.getRequests(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const cancelRequest = createAsyncThunk('requests/cancel', async (requestId, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user
    if (!user || !user.isAdmin) {
      throw new Error('No tienes permisos para cancelar solicitudes')
    }
    const token = user.token;
    await requestService.cancelRequest(requestId, token)
    return requestId
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message);
  }
})

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  // Define reducers adicionales aquí si es necesario
  extraReducers: (builder) => {
    builder
      .addCase(createRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requests.push(action.payload);
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requests = action.payload;
      })
      .addCase(getRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(cancelRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requests = state.requests.filter((request) => request._id !== action.payload)
      })
      .addCase(cancelRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload;
        if (action.payload === 'No tienes permisos para cancelar solicitudes') {
          state.message = 'No puedes cancelar tus propias cotizaciones porque no eres administrador';
        }
      });
  },
})

export const { reset } = requestSlice.actions
export default requestSlice.reducer
