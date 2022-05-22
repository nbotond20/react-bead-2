import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { authApiSlice, authApiSliceReducer } from './auth/authApiSlice';
import { tasksApiSlice } from './tasks/tasksApiSlice';
import { taskListsApiSlice } from './takskslists/tasksListsApiSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApiSlice.reducerPath]: authApiSliceReducer,
        [tasksApiSlice.reducerPath]: tasksApiSlice.reducer,
        [taskListsApiSlice.reducerPath]: taskListsApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApiSlice.middleware).concat(tasksApiSlice.middleware).concat(taskListsApiSlice.middleware)
});

export default store;
