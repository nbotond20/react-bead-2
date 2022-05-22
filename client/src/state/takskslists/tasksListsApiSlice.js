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

export const taskListsApiSlice = createApi({
    reducerPath: 'taskListsApi',
    baseQuery,
    endpoints: (builder) => ({
        getTaskLists: builder.query({
            query: () => ({
                url: 'tasklists'
            }),
            transformResponse: (response) => response.data
        }),
        getTaskList: builder.query({
            query: (id) => ({
                url: `tasklists/${id}}`
            }),
            transformResponse: (response) => response.data
        }),
        getTaskListsRange: builder.query({
            query: (skip, limit) => ({
                url: `tasklists?skip=${skip}&limit=${limit}`
            }),
            transformResponse: (response) => response.data
        }),
        createTaskList: builder.mutation({
            query: (body) => ({
                url: 'tasklists',
                method: 'POST',
                body
            })
        }),
        deleteTaskList: builder.mutation({
            query: (id) => ({
                url: `tasklists/${id}}`,
                method: 'DELETE'
            })
        }),
        modifyTaskList: builder.mutation({
            query: (id, body) => ({
                url: `tasklists/${id}}`,
                method: 'PATCH',
                body
            })
        })
    })
});

// reducer
export const taskListsApiSliceReducer = taskListsApiSlice.reducer;
// hooks
export const {
    useGetTaskListsQuery,
    useGetTaskListQuery,
    useGetTaskListsRangeQuery,
    useCreateTaskListMutation,
    useDeleteTaskListMutation,
    useModifyTaskListMutation
} = taskListsApiSlice;
