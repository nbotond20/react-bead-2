import { Avatar, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectLoggedInUser, logout } from '../../state/auth/authSlice';
import CenterContainer from '../utils/CenterContainer';
import style from './css/Profile.module.css';
import useDocumentTitle from '../utils/useDocumentTitle'
import { useGetTaskListsQuery } from '../../state/takskslists/tasksListsApiSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectLoggedInUser);

    const { data } = useGetTaskListsQuery();
    const taskListCount = data?.filter(e => e.userId === user.id).length;

    useDocumentTitle('Task-Manager - Profile');

    return (
        <CenterContainer>
            <div className={style.card}>
                <Avatar
                    children={user ? `${user?.fullname.split(' ')[0][0]}${user?.fullname.split(' ')[1][0]}` : ''}
                    sx={{ height: 125, width: 125 , fontSize: '3rem'}}
                />
                <div>
                    <Typography variant="h4">
                        {user ? user.fullname : '-'}
                    </Typography>
                </div>
                <div sx={{ fontWeigth: 'normal' }}>
                    <Typography variant="h7">
                        {user ? user.email : '-'}
                    </Typography>
                </div>
                <div sx={{ fontWeigth: 'normal' }}>
                    <Typography variant="h7">
                        Tasklists count: {taskListCount ? taskListCount : 0}
                    </Typography>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {dispatch(logout()); navigate('/')}}
                    sx={{ position: 'absolute', bottom: '2em' }}
                >
                    Log Out
                </Button>
            </div>
        </CenterContainer>
    );
};

export default Profile;
