import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// Libs
import { Link } from "react-router-dom";
import { AxiosApi } from '../../services/AxiosApi';
// Custom
import { RadioForm } from '../../components/RadioGroup/RadioForm';
import { FormValidation } from "../../services/FormValidation";
import { InformativeModal } from "../../components/InformativeModal/InformativeModal";
// Types
import { RequestStatus } from '../../common/types';
import { FieldError } from '../../common/types';
import { FieldErrorMessage } from '../../common/types';
import { InputValidation } from '../../common/types';
import { FormData } from '../../common/types';
import { ServerValidationErrors } from '../../common/types';
import { AxiosError, AxiosResponse } from 'axios';

const radio_options: { value: string, label: string }[] = [
    { value: "m", label: "Male" },
    { value: "f", label: "Female" }
];

export const Register = React.memo(() => {

    const [formData, setFormData] = React.useState<FormData>({ name: "", sex: "", email: "", password: "", password_confirmation: "" });
    const [fieldError, setFieldError] = React.useState<FieldError>({ name: false, sex: false, email: false, password: false, password_confirmation: false });
    const [fieldErrorMessage, setFieldErrorMessage] = React.useState<FieldErrorMessage>({ name: "", sex: "", email: "", password: "", password_confirmation: "" });
    const [serverResponse, setServerResponse] = React.useState<RequestStatus>({ status: false, error: false, message: "" });

    /*
    *   Method for handle what is typed in the formulary.
    */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({ ...formData, [event.target.name]: event.currentTarget.value })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formularyDataValidate()) {
            serverRequestExecution();
        }

    };

    const formularyDataValidate = (): Boolean => {

        const nameValidation: InputValidation = FormValidation(formData.name, 3, null, null, "name");
        const sexValidation: InputValidation = FormValidation(formData.sex, null, null, null, "sex");
        const emailValidation: InputValidation = FormValidation(formData.email, 3, null, null, "email");
        const passwordValidation: InputValidation = FormValidation(formData.password, 5, null, null, "password");
        const passwordConfirmationValidation: InputValidation = formData.password === formData.password_confirmation ? { error: false, message: "" } : { error: true, message: "The passwords do not match" }

        setFieldError({ name: nameValidation.error, sex: sexValidation.error, email: emailValidation.error, password: passwordValidation.error, password_confirmation: passwordConfirmationValidation.error });
        setFieldErrorMessage({ name: nameValidation.message, sex: sexValidation.message, email: emailValidation.message, password: passwordValidation.message, password_confirmation: passwordConfirmationValidation.message });

        return !(nameValidation.error || sexValidation.error || emailValidation.error || passwordValidation.error || passwordConfirmationValidation.error);

    }

    const serverRequestExecution = (): void => {

        AxiosApi.post('http://127.0.0.1:8000/api/register', formData)
            .then(function (response) {

                successServerRequest(response);

            })
            .catch(function (error) {

                errorServerRequest(error.response);

            })

    }

    const successServerRequest = (response: AxiosResponse) => {

        setServerResponse({ status: true, error: false, message: response.data.message });

        setTimeout(() => {
            window.location.href = "http://localhost:3000/";
        }, 3000);

    }

    const errorServerRequest = (response: AxiosResponse): void => {

        const error_message = response.data.message ? response.data.message : "Server Error!";
        setServerResponse({ status: true, error: true, message: error_message });

        setTimeout(() => {
            setServerResponse({ status: false, error: false, message: "" });
        }, 2000);

        // Definição dos objetos de erro possíveis de serem retornados pelo validation do Laravel
        let server_validation: ServerValidationErrors = {
            name: { error: false, message: "" },
            sex: { error: false, message: "" },
            email: { error: false, message: "" },
            password: { error: false, message: "" },
            password_confirmation: { error: false, message: "" }
        }

        // Coleta dos objetos de erro existentes na response
        for (let prop in response.data.errors) {

            server_validation[prop] = {
                error: true,
                message: response.data.errors[prop][0]
            }

        }

        setFieldError({
            name: server_validation.name.error,
            sex: server_validation.sex.error,
            email: server_validation.email.error,
            password: server_validation.password.error,
            password_confirmation: server_validation.password_confirmation.error
        });


        setFieldErrorMessage({
            name: server_validation.name.message,
            sex: server_validation.sex.message,
            email: server_validation.email.message,
            password: server_validation.password.message,
            password_confirmation: server_validation.password_confirmation.message
        });

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
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="given-name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                error={fieldError.name}
                                helperText={fieldErrorMessage.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioForm event={handleInputChange} name={"sex"} options={radio_options} row={true} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                error={fieldError.email}
                                helperText={fieldErrorMessage.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                error={fieldError.password}
                                helperText={fieldErrorMessage.password}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password_confirmation"
                                label="Password Confirmation"
                                type="password"
                                id="password"
                                error={fieldError.password_confirmation}
                                helperText={fieldErrorMessage.password_confirmation}
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
                    >
                        Sign Up
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