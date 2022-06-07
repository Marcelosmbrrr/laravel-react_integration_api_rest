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

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export function Layout() {

    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState("Dashboard");

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Header open={open} setOpen={setOpen} page = {page} />

            <Navigation open={open} setOpen={setOpen} />

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />

                <Routes>
                    <Route path = "dashboard" element={<Dashboard setPage = {setPage} />} />
                    <Route path="administration" element={<Administration setPage = {setPage} />} />
                    <Route path="profile" element={<Profile setPage = {setPage} />} />
                    <Route path="support" element={<Support setPage = {setPage} />} />
                </Routes>
            </Box>
        </Box>
    );
}
