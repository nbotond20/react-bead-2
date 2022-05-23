import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:3030/';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

export const tasksApiSlice = createApi({
    reducerPath: 'tasksApi',
    baseQuery,
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => ({
                url: 'tasks'
            }),
            transformResponse: (response) => response.data
        }),
        getTask: builder.query({
            query: (id) => ({
                url: `tasks/${id}}`
            }),
            transformResponse: (response) => response.data
        }),
        getTasksRange: builder.query({
            query: (params) => ({
                url: 'tasks?$skip='+params.skip+'&$limit='+params.limit
            }),
            transformResponse: (response) => response.data
        }),
        createTask: builder.mutation({
            query: (body) => ({
                url: 'tasks',
                method: 'POST',
                body
            })
        }),
    })
});

// reducer
export const tasksApiSliceReducer = tasksApiSlice.reducer;
// hooks
export const { useGetTasksQuery, useGetTaskQuery, useGetTasksRangeQuery, useCreateTaskMutation } = tasksApiSlice;
