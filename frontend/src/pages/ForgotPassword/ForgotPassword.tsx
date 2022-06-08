import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
// Libs
import Axios from 'axios';
import { Link } from "react-router-dom";
// Custom 
import { FormValidation } from '../../services/FormValidation';

export interface Validation {
    error: boolean,
    message: string
}

export interface fieldError {
    email: boolean,
    code: boolean,
    new_password: boolean,
    new_password_confirmation: boolean
}

export interface fieldErrorMessage {
    email: string,
    code: string,
    new_password: string,
    new_password_confirmation: string
}

export const ForgotPassword = React.memo(() => {

    const [fieldError, setFieldError] = React.useState<fieldError>({ email: false, code: false, new_password: false, new_password_confirmation: false });
    const [fieldErrorMessage, setFieldErrorMessage] = React.useState<fieldErrorMessage>({ email: "", code: "", new_password: "", new_password_confirmation: "" });

    const handleSubmitEmail = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        if (formularyEmailValidate(formData)) {

            getCodeServerRequestExecution(formData);

        }
    }

    const handleSubmitUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        if (formularyUpdatePasswordValidate(formData)) {

            updatePasswordServerRequestExecution(formData);

        }
    }

    const formularyEmailValidate = (formData: FormData): Boolean => {

        const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        const emailValidation: Validation = FormValidation(formData.get("email"), null, null, emailPattern, "email");

        setFieldError({ code: false, email: false, new_password: false, new_password_confirmation: false });
        setFieldErrorMessage({ code: "", email: "", new_password: "", new_password_confirmation: "" });

        if (emailValidation.error) {
            return false;
        } else {
            return true;
        }

    }

    const formularyUpdatePasswordValidate = (formData: FormData): Boolean => {

        const codeValidation: Validation = FormValidation(formData.get("code"), 5, 5, null, "code");
        const newPasswordValidation: Validation = FormValidation(formData.get("new_password"), 3, null, null, "new password");
        const newPasswordConfirmationValidation: Validation = formData.get("new_password") === formData.get("new_password_confirmation") ? { error: false, message: "" } : { error: true, message: "The passwords do not match" }

        setFieldError({ code: codeValidation.error, email: false, new_password: newPasswordValidation.error, new_password_confirmation: newPasswordConfirmationValidation.error });
        setFieldErrorMessage({ code: codeValidation.message, email: "", new_password: newPasswordValidation.message, new_password_confirmation: newPasswordConfirmationValidation.message });

        if (codeValidation.error || newPasswordValidation.error || newPasswordConfirmationValidation.error) {
            return false;
        } else {
            return true;
        }

    }

    const getCodeServerRequestExecution = (formData: FormData): void => {

        Axios.post('/api/register', formData)
            .then(function (response) {

                console.log(response);
            })
            .catch(function (error) {

                console.log(error);
            })

    }

    const updatePasswordServerRequestExecution = (formData: FormData): void => {

        Axios.post('/api/register', formData)
            .then(function (response) {

                console.log(response);
            })
            .catch(function (error) {

                console.log(error);
            })

    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Recover Account
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmitEmail} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="email"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoFocus
                                InputProps={{
                                    endAdornment:
                                        <IconButton color='primary'>
                                            <EmailIcon fontSize="inherit" />
                                        </IconButton>,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box component="form" noValidate onSubmit={handleSubmitUpdate} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="code"
                                label="Code"
                                name="code"
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="new_password"
                                label="New Password"
                                type="password"
                                id="new_password"
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="new_password_confirmation"
                                label="New Password Confirmation"
                                type="password"
                                id="new_password_confirmation"
                                disabled={true}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={true}
                    >
                        Change Password
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/">
                                <Typography>Already have an account? Sign in</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
});