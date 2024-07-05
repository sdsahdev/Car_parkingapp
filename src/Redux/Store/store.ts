import {configureStore, combineReducers} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';

import formSlice from '../Slices/formSlice'; // Ensure the case matches the folder name

import authSlice from '../Slices/authSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import {persistReducer} from 'redux-persist';
import parkingSlice from '../Slices/parkingSlice';
import vehicleSlice from '../Slices/vehicleSlice';
import bookingSlice from '../Slices/bookingSlice';
import PaymentSlice from '../Slices/PaymentSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'auth',
    'form',
    'parkingData',
    'vehicle',
    'booking',
    'PaymentSlice',
  ], // Only persist these reducers
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  form: formSlice,
  parkingData: parkingSlice,
  vehicle: vehicleSlice,
  booking: bookingSlice,
  PaymentSlice: PaymentSlice,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);

// Types for dispatch and selector
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
