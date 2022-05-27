import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { authApiSlice, authApiSliceReducer } from './auth/authApiSlice';
import { tasksApiSlice, tasksApiSliceReducer } from './tasks/tasksApiSlice';
import { taskListsApiSlice, taskListsApiSliceReducer } from './takskslists/tasksListsApiSlice';
import { editReducer } from './edit/editSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        edit: editReducer,
        [authApiSlice.reducerPath]: authApiSliceReducer,
        [tasksApiSlice.reducerPath]: tasksApiSliceReducer,
        [taskListsApiSlice.reducerPath]: taskListsApiSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApiSlice.middleware).concat(tasksApiSlice.middleware).concat(taskListsApiSlice.middleware)
});

export default store;
