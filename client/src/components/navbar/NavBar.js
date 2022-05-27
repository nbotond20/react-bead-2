import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import AuthStatus from '../auth/AuthStatus';
import { logout, selectLoggedInUser } from '../../state/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectEdit } from '../../state/edit/editSlice';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const linkStyle = {
    textDecoration: 'none',
    color: 'inherit'
};

const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const editing = useSelector(selectEdit);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <TaskAltIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        <Link to={'/'} style={linkStyle}>
                            Task-Manager
                        </Link>
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' }
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link to={'/tasks'} style={linkStyle}>
                                        Tasks
                                    </Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link to={'/tasklists'} style={linkStyle}>
                                        TaskLists
                                    </Link>
                                </Typography>
                            </MenuItem>
                            {editing !== null && (
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link
                                            to={'/last-edited'}
                                            style={linkStyle}
                                        >
                                            Last Edited
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                    <TaskAltIcon
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        <Link to={'/'} style={linkStyle}>
                            Task-Manager
                        </Link>
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        {user ? (
                            <>
                                <Link to={'/tasks'} style={linkStyle}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: 'white',
                                            display: 'block'
                                        }}
                                    >
                                        Tasks
                                    </Button>
                                </Link>
                                <Link to={'/tasklists'} style={linkStyle}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: 'white',
                                            display: 'block'
                                        }}
                                    >
                                        Tasklists
                                    </Button>
                                </Link>
                                {editing !== null && (
                                    <Link to={'/last-edited'} style={linkStyle}>
                                        <Button
                                            onClick={handleCloseNavMenu}
                                            sx={{
                                                my: 2,
                                                color: 'white',
                                                display: 'block'
                                            }}
                                        >
                                            Last Edited
                                        </Button>
                                    </Link>
                                )}
                            </>
                        ) : (
                            ''
                        )}
                    </Box>
                    {user ? (
                        <Link to={'/'} style={linkStyle}>
                            <Button
                                onClick={() => {
                                    handleCloseNavMenu();
                                    dispatch(logout());
                                }}
                                sx={{
                                    my: 2,
                                    color: 'lightgray',
                                    display: 'block'
                                }}
                            >
                                Log out
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link to={'/login'} style={linkStyle}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'lightgray',
                                        display: 'block'
                                    }}
                                >
                                    Login
                                </Button>
                            </Link>
                            /
                            <Link to={'/register'} style={linkStyle}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'lightgray',
                                        display: 'block'
                                    }}
                                >
                                    Register
                                </Button>
                            </Link>
                        </>
                    )}

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    children={
                                        user
                                            ? `${
                                                  user?.fullname.split(
                                                      ' '
                                                  )[0][0]
                                              }${
                                                  user?.fullname.split(
                                                      ' '
                                                  )[1][0]
                                              }`
                                            : ''
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <AuthStatus
                                handleCloseUserMenu={handleCloseUserMenu}
                            />
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
