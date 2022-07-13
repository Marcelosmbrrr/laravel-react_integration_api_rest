import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// Router
import { Routes, Route, useNavigate } from "react-router-dom";
// Custom
import { useAuth } from '../../context/AuthContext';
import { Navigation } from '../../components/Navigation/Navigation';
import { Header } from '../../components/Header/Header';
import { Dashboard } from './Dashboard';
import { Administration } from './Administration';
import { Profile } from './Profile';
import { Support } from './Support';
import { AxiosApi } from '../../services/AxiosApi';
import { InformativeModal } from '../../components/InformativeModal/InformativeModal';
// Types
import { RequestStatus } from '../../common/types';

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
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState("Dashboard");
    const [serverResponse, setServerResponse] = React.useState<RequestStatus>({ status: false, error: false, message: "" });

    /*
    * Check sanctum token.
    */
    React.useEffect(() => {

        if (!localStorage.getItem("api_token")) {
            authenticationFailed({});
        }

        setAuth(true);
        getAuthenticationData({});


    }, []);

    const getAuthenticationData = (body: {}) => {

        const request_config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("api_token")}` }
        }

        AxiosApi.post('http://127.0.0.1:8000/api/load-user-data', body, request_config)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {

                const error_message = error.response.data.message ? error.response.data.message : "Server Error!";
                setServerResponse({ status: true, error: true, message: error_message });

                setTimeout(() => {
                    setServerResponse({ status: false, error: false, message: "" });
                    authenticationFailed({});
                }, 2000);

            })

    }

    const authenticationFailed = (body: {}) => {

        const request_config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("api_token")}` }
        }

        setAuth(false);
        AxiosApi.post('http://127.0.0.1:8000/api/logout', body, request_config)
            .then(() => {
                navigate("/");
            })
    }

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

            {serverResponse.status &&
                <InformativeModal content={{ text: serverResponse.message, error: serverResponse.error }} />
            }
        </>

    );
}
