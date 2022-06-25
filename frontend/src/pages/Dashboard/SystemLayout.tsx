import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// Router
import { Routes, Route } from "react-router-dom";
// Custom
import { Navigation } from '../../components/Navigation/Navigation';
import { Header } from '../../components/Header/Header';
import { Dashboard } from './Dashboard';
import { Administration } from './Administration';
import { Profile } from './Profile';
import { Support } from './Support';
import { useAuth } from '../../context/AuthContext';
import { AxiosApi } from '../../services/AxiosApi';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export function SystemLayout() {

    const { isAuth, setAuth } = useAuth();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState("Dashboard");

    /*
    * Check sanctum token.
    */
    React.useEffect(() => {
        if (!localStorage.getItem("auth_token")) {
            setAuth(false);
            window.location.href = "http://127.0.0.1:8000/api/logout";
        }
        setAuth(true);
    });

    return (

        isAuth &&
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <Header open={open} setOpen={setOpen} page={page} />

                <Navigation open={open} setOpen={setOpen} />

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Routes>
                        <Route path="dashboard" element={<Dashboard setPage={setPage} />} />
                        <Route path="administration" element={<Administration setPage={setPage} />} />
                        <Route path="profile" element={<Profile setPage={setPage} />} />
                        <Route path="support" element={<Support setPage={setPage} />} />
                    </Routes>
                </Box>
            </Box>
        </>

    );
}
