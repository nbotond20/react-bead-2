import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { authApiSlice, authApiSliceReducer } from './auth/authApiSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApiSlice.reducerPath]: authApiSliceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApiSlice.middleware)
});

export default store;
