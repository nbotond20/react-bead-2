import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { authApiSlice, authApiSliceReducer } from './auth/authApiSlice';
import { tasksApiSlice } from './tasks/tasksApiSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApiSlice.reducerPath]: authApiSliceReducer,
        [tasksApiSlice.reducerPath]: tasksApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApiSlice.middleware).concat(authApiSlice.middleware)
});

export default store;
