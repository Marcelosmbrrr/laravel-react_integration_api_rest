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
import { InformativeModal } from '../../components/InformativeModal/InformativeModal';
// Types
import { RequestStatus } from '../../common/types';
import { FieldError } from '../../common/types';
import { FieldErrorMessage } from '../../common/types';
import { InputValidation } from '../../common/types';
import { FormData } from '../../common/types';

export const ForgotPassword = React.memo(() => {

    const [formDataEmail, setFormDataEmail] = React.useState<FormData>({ email: "" });
    const [formDataChangePassword, setFormDataChangePassword] = React.useState<FormData>({ token: "", new_password: "", new_password_confirmation: "" });
    const [fieldError, setFieldError] = React.useState<FieldError>({ email: false, token: false, new_password: false, new_password_confirmation: false });
    const [fieldErrorMessage, setFieldErrorMessage] = React.useState<FieldErrorMessage>({ email: "", token: "", new_password: "", new_password_confirmation: "" });
    const [serverResponse, setServerResponse] = React.useState<RequestStatus>({ status: false, error: false, message: "" });
    const [disabledForm, setDisabledForm] = React.useState(true);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormDataChangePassword({ ...formDataChangePassword, [event.target.name]: event.currentTarget.value })
    }

    const handleSubmitEmail = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formularyEmailValidate()) {
            getCodeServerRequestExecution();
        }
    }

    const handleSubmitUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formularyUpdatePasswordValidate()) {
            updatePasswordServerRequestExecution();
        }
    }

    const formularyEmailValidate = (): Boolean => {

        const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        const emailValidation: InputValidation = FormValidation(formDataEmail.email, null, null, emailPattern, "email");

        setFieldError({ token: false, email: false, new_password: false, new_password_confirmation: false });
        setFieldErrorMessage({ token: "", email: "", new_password: "", new_password_confirmation: "" });

        return !(emailValidation.error);

    }

    const formularyUpdatePasswordValidate = (): Boolean => {

        const codeValidation: InputValidation = FormValidation(formDataChangePassword.token, 10, 10, null, "token");
        const newPasswordValidation: InputValidation = FormValidation(formDataChangePassword.new_password, 3, null, null, "new password");
        const newPasswordConfirmationValidation: InputValidation = formDataChangePassword.new_password === formDataChangePassword.new_password_confirmation ? { error: false, message: "" } : { error: true, message: "The passwords do not match" }

        setFieldError({ token: codeValidation.error, email: false, new_password: newPasswordValidation.error, new_password_confirmation: newPasswordConfirmationValidation.error });
        setFieldErrorMessage({ token: codeValidation.message, email: "", new_password: newPasswordValidation.message, new_password_confirmation: newPasswordConfirmationValidation.message });

        return !(codeValidation.error || newPasswordValidation.error || newPasswordConfirmationValidation.error);

    }

    const getCodeServerRequestExecution = (): void => {

        Axios.post('http://127.0.0.1:8000/api/change-password-token', formDataEmail)
            .then(function (response) {

                setDisabledForm(false);
                setServerResponse({ status: true, error: false, message: response.data.message });

                setTimeout(() => {
                    setServerResponse({ status: false, error: false, message: "" });
                }, 2000);

            })
            .catch(function (error) {

                setDisabledForm(true);
                setServerResponse({ status: true, error: true, message: error.response.data.message });

                setTimeout(() => {
                    setServerResponse({ status: false, error: false, message: "" });
                }, 2000);

            })

    }

    const updatePasswordServerRequestExecution = (): void => {

        Axios.post('http://127.0.0.1:8000/api/change-password', formDataChangePassword)
            .then(function (response) {

                setDisabledForm(true);
                setServerResponse({ status: true, error: false, message: response.data.message });
                setFormDataChangePassword({ token: "", new_password: "", new_password_confirmation: "" });

            })
            .catch(function (error) {

                setServerResponse({ status: true, error: error, message: error.response.data.message });

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

                <Box component="form" id="get_token_form" noValidate onSubmit={handleSubmitEmail} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                value={formDataEmail.email}
                                autoFocus
                                InputProps={{
                                    endAdornment:
                                        <IconButton type="submit" form="get_token_form" color='primary' disabled={!disabledForm}>
                                            <EmailIcon fontSize="inherit" />
                                        </IconButton>,
                                }}
                                error={fieldError.email}
                                helperText={fieldErrorMessage.email}
                                onChange={(e) => setFormDataEmail({ email: e.currentTarget.value })}
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
                                id="token"
                                label="Code"
                                name="token"
                                value={formDataChangePassword.token}
                                disabled={disabledForm}
                                error={fieldError.token}
                                helperText={fieldErrorMessage.token}
                                onChange={handleInputChange}
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
                                value={formDataChangePassword.new_password}
                                disabled={disabledForm}
                                error={fieldError.new_password}
                                helperText={fieldErrorMessage.new_password}
                                onChange={handleInputChange}
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
                                value={formDataChangePassword.new_password_confirmation}
                                disabled={disabledForm}
                                error={fieldError.new_password_confirmation}
                                helperText={fieldErrorMessage.new_password_confirmation}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>

                    {serverResponse.status &&
                        <InformativeModal content={{ text: serverResponse.message, error: serverResponse.error }} />
                    }

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={disabledForm}
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