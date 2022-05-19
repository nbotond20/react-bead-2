import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import RequireAuth from './components/auth/RequireAuth';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectLoggedInUser } from './state/auth/authSlice';
import { useEffect } from 'react';

function App() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const userJSON = localStorage.getItem('user');
    const localUser = userJSON ? JSON.parse(userJSON) : null;

    useEffect(() => {
        if (token && localUser) {
            dispatch(login({ user: localUser, token }));
        }
    }, [dispatch, token, localUser]);

    return (
        <>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="tasks" element={<RequireAuth>asdasasda</RequireAuth>} />
                    <Route path="my-tests" element={<RequireAuth>asdasasda</RequireAuth>} />
                    <Route path="last-edited" element={<RequireAuth>asdasasda</RequireAuth>} />
                    <Route path="profile" element={<RequireAuth>asdasasda</RequireAuth>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
