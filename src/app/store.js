import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { reset } from '../features/auth/authSlice';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import requestReducer from '../features/requests/requestSlice';
import paymentReducer from '../features/payments/paymentSlice';
import projectReducer from '../features/projects/projectSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'request', 'payments', 'projects'], // Lista de reducers para persistir
};

// Combinar los reducers antes de usarlos con persistReducer
const rootReducer = combineReducers({
  auth: authReducer,
  request: requestReducer,
  payment: paymentReducer,
  project: projectReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);