import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as requestService from './requestService';

const initialState = {
  userRequests: {}, 
  error: null,
  isSuccess: false,
  isLoading: false,
  message: '',
  requests: [],
};

export const createRequest = createAsyncThunk('requests/create', async (requestData, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    if (!user) {
      throw new Error('Debes iniciar sesión para crear una nueva solicitud');
    }
    const token = user.token;
    const newRequest = await requestService.createRequest(requestData, token);

    thunkAPI.dispatch(addRequestForUser({ userId: user._id, request: newRequest }));

    return newRequest;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || 'Error al crear la solicitud';
    return thunkAPI.rejectWithValue(message);
  }
});


export const cancelRequest = createAsyncThunk('requests/cancel', async (requestId, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    if (!user) {
      throw new Error('Debes iniciar sesión para cancelar una solicitud');
    }
    const token = user.token;

    // Verificar si el usuario es un administrador
    const isAdmin = user.isAdmin;

    if (!isAdmin && user._id !== request.user) {
      throw new Error('No tienes permiso para cancelar esta solicitud');
    }

    await requestService.cancelRequest(requestId, token);

    thunkAPI.dispatch(removeRequestForUser({ userId: user._id, requestId }));

    return requestId;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteRequest = createAsyncThunk('requests/delete', async (requestId, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    if (!user) {
      throw new Error('Debes iniciar sesión para realizar esta acción');
    }

    if (!user.isAdmin) {
      throw new Error('No tienes permisos de administrador para realizar esta acción');
    }

    const token = user.token;

    await requestService.deleteRequest(requestId, token);

    return requestId;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || 'Error al eliminar la solicitud';
    return thunkAPI.rejectWithValue(message);
  }
});


export const loadUserRequests = createAsyncThunk('requests/loadUserRequests', async (userId) => {
  try {
    const response = await requestService.getUserRequests(userId) 
    return { userId, requests: response.data }
  } catch (error) {
  }
});

export const updateFile = createAsyncThunk('requests/updateFile', async ({ requestId, fileData}, thunkAPI) => {
  try {
    await requestService.updateFile(requestId, fileData);
    const user = thunkAPI.getState().auth.user;
    if (user) {
      thunkAPI.dispatch(loadUserRequests(user._id));
    }
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getAllRequests = createAsyncThunk('auth/getAllRequests', async (_, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;

    if (!user || !user.isAdmin) {
      throw new Error('Acceso no autorizado: Debes ser un administrador para obtener todas las requests.');
    }

    const token = user.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No hay token disponible');
    }

    const requests = await requestService.getAllRequests(token); // Asegúrate de importar esta función correctamente
    return requests;

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
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
    requestDeleted: () => {
      state.userRequests = state.userRequests.filter(request => request._id !== action.payload);
    }
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
      .addCase(deleteRequest.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteRequest.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deleteRequest.rejected, (state, action) => {
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
      })
      .addCase(updateFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFile.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload.error.message;
      })
      .addCase(getAllRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requests = action.payload;
      })
      .addCase(getAllRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
})

export const { reset, addRequestForUser, removeRequestForUser } = requestSlice.actions
export default requestSlice.reducer
