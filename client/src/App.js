import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import RequireAuth from './components/auth/RequireAuth';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import Tasks from './components/tasks/Tasks';
import TaskLists from './components/tasklists/TaskLists';
import { useDispatch } from 'react-redux';
import { login } from './state/auth/authSlice';
import { useEffect } from 'react';
import My404Page from './components/my404page/My404Page';
import Profile from './components/profile/Profile';
import Edit from './components/edit/Edit';
import { load, setEditing, setUserId } from './state/edit/editSlice';

function App() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const userJSON = localStorage.getItem('user');
    const localUser = userJSON ? JSON.parse(userJSON) : null;

    if (localUser && token) {
        const editingTaskList = localStorage.getItem(
            'taskList-' + localUser.id
        );
        const localTaskList = editingTaskList
            ? JSON.parse(editingTaskList)
            : null;

        if (localTaskList) {
            dispatch(setEditing({ taskList: localTaskList }));
        }
    }

    useEffect(() => {
        if (token && localUser) {
            dispatch(login({ user: localUser, token }));
            dispatch(setUserId({ userId: localUser.id }));
            dispatch(load());
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
                    <Route
                        path="tasks"
                        element={
                            <RequireAuth>
                                <Tasks />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="tasklists"
                        element={
                            <RequireAuth>
                                <TaskLists />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="last-edited"
                        element={
                            <RequireAuth>
                                <Edit />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="profile"
                        element={
                            <RequireAuth>
                                <Profile />
                            </RequireAuth>
                        }
                    />
                    <Route path="*" element={<My404Page />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
