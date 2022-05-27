import { MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, selectLoggedInUser } from '../../state/auth/authSlice';

const linkStyle = {
    textDecoration: 'none',
    color: 'inherit'
};

const AuthStatus = ({ handleCloseUserMenu }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    if (!user) {
        return (
            <>
                <Link to="/login" style={linkStyle}>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                </Link>
                <Link to="/Register" style={linkStyle}>
                    <MenuItem onClick={() => handleCloseUserMenu}>
                        <Typography textAlign="center">Register</Typography>
                    </MenuItem>
                </Link>
            </>
        );
    }

    return (
        <>
            <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                    <Link to="/profile" style={linkStyle}>
                        Profile
                    </Link>
                </Typography>
            </MenuItem>
            <MenuItem
                onClick={() => {
                    handleCloseUserMenu();
                    dispatch(logout());
                }}
            >
                <Typography textAlign="center">Logout</Typography>
            </MenuItem>
        </>
    );
};

export default AuthStatus;
