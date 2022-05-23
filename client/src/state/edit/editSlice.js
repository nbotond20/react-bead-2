import { createSlice } from '@reduxjs/toolkit';

const initialState = { taskList: null };

const editSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        setEdited: (state, { payload: { taskList } }) => {
            state.taskList = taskList;
            localStorage.setItem('taskList', JSON.stringify(taskList));
        },
        save: (state) => {
            state.taskList = null;
            localStorage.removeItem('taskList');
        }
    }
});

// reducer
export const editReducer = editSlice.reducer;
// action creators
export const { setEdited, save } = editSlice.actions;
// selectors
export const selectCurrentlyEditing = (state) => state.auth.user;
