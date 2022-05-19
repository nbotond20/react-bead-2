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
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                        <Link to="/login" style={linkStyle}>
                            Login
                        </Link>
                    </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleCloseUserMenu}>
                    <Typography textAlign="center">
                        <Link to="/Register" style={linkStyle}>
                            Register
                        </Link>
                    </Typography>
                </MenuItem>
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
