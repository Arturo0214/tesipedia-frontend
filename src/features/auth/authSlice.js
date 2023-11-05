import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService, {isUserAdmin} from '../auth/authService'

export const initialState = {
  user: null,
  error: null,
  isLoading: false,
  isSuccess: false,
  isAdminLoggedIn: isUserAdmin(),
  isAuthenticated: false,
  message: '',
  users: [],
  userbyId: null,
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const login = createAsyncThunk('auth/login', async (userData, {rejectWithValue}) => {
  try {
    return await authService.login(userData)
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, {rejectWithValue}) => {
  try {
    await authService.logout()
    return initialState
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return rejectWithValue(message)
  }
})

export const getAllUsers = createAsyncThunk('auth/getAllUsers', async (_, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;

    if (!user || !user.isAdmin) {
      throw new Error('Acceso no autorizado: Debes ser un administrador para obtener todos los usuarios.');
    }

    const token = user.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No hay token disponible');
    }

    const users = await authService.getAllUsers(token);
    return users;

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message)
  }
});

export const getUserById = createAsyncThunk('auth/getUserById', async (_, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;

    if (!user || !user.isAdmin) {
      throw new Error('Acceso no autorizado: Debes ser un administrador para obtener todos los usuarios.');
    }

    const token = user.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No hay token disponible');
    }

    const userbyId = await authService.getUserById(token);
    return userbyId;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.isAdminLoggedIn = isUserAdmin() // If admin status can change, handle it separately.
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = true;
        state.user = null;
        state.isAdminLoggedIn = false;
        state.message = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isAdminLoggedIn = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userbyId = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { reset } = authSlice.actions
export default authSlice.reducer