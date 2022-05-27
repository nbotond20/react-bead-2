import { createSlice } from '@reduxjs/toolkit';

const initialState = { taskList: null, userId: null };

const editSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        setEditing: (state, { payload: { taskList } }) => {
            if(state.userId !== null){
                state.taskList = taskList;
                localStorage.setItem(
                    `taskList-${state.userId}`,
                    JSON.stringify(taskList)
                );
            }
        },
        load: (state) => {
            const taskListJSON = localStorage.getItem(`taskList-${state.userId}`);
            const taskList = JSON.parse(taskListJSON);
            if (taskList) {
                state.taskList = taskList;
            }else{
                state.taskList = null;
            }
        },
        addTask: (state, { payload: { task } }) => {
            state.taskList.tasks.push(task);
            if(state.userId !== null){
                localStorage.setItem(
                    `taskList-${state.userId}`,
                    JSON.stringify(state.taskList)
                );
            }
        },
        setUserId: (state, { payload: { userId } }) => {
            state.userId = userId;
        },
        updateTasklist: (state, { payload: { taskList } }) => {
            state.taskList = taskList;
            if(state.userId !== null){
                localStorage.setItem(
                    `taskList-${state.userId}`,
                    JSON.stringify(taskList)
                );
            }
        },
        clear(state){
            state.taskList = null;
            localStorage.removeItem(`taskList-${state.userId}`);
        }
    }
});

// reducer
export const editReducer = editSlice.reducer;
// action creators
export const { setEditing, load, addTask, setUserId, updateTasklist, clear } = editSlice.actions;
// selectors
export const selectEdit = (state) => state.edit.taskList;
