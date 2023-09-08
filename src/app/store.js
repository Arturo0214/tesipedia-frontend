import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import requestReducer from '../features/requests/requestSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'request'], // Lista de reducers para persistir
};

// Combinar los reducers antes de usarlos con persistReducer
const rootReducer = combineReducers({
  auth: authReducer,
  request: requestReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);