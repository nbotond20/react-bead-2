import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: null, token: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload: { user, token } }) => {
            state.user = user;
            state.token = token;
            // Save token to local storage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            // Remove token from local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
});

// reducer
export const authReducer = authSlice.reducer;
// action creators
export const { login, logout } = authSlice.actions;
// selectors
export const selectLoggedInUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
