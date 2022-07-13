import * as React from 'react';
// Material UI
import { AxiosApi } from '../../services/AxiosApi';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Box, Toolbar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
// Routes
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

interface Props {
    open: boolean,
    setOpen: Function,
    page: string
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


export function Header(props: Props) {

    const { isAuth, setAuth } = useAuth();
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        props.setOpen(true);
    }

    const handleLogout = () => {

        const data = {};

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("api_token")}` }
        };

        setAuth(false);

        AxiosApi.post('http://127.0.0.1:8000/api/logout', data, config)
            .then(function (response) {
                navigate("/");
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            <AppBar position="fixed" open={props.open}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(props.open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            {props.page.toUpperCase()}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" noWrap component="div">
                            <IconButton onClick={() => handleLogout()}>
                                <LogoutIcon />
                            </IconButton>
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}