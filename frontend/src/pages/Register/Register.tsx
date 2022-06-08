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
import Axios from 'axios';
// Custom
import { RadioForm } from '../../components/RadioGroup/RadioForm';
import { FormValidation } from '../../services/FormValidation';

const radio_options: { value: string, label: string }[] = [
    { value: "m", label: "Male" },
    { value: "f", label: "Female" }
];

export interface Validation {
    error: boolean,
    message: string
}

export interface fieldError {
    name: boolean,
    gender: boolean,
    email: boolean,
    password: boolean,
    password_confirmation: boolean
}

export interface fieldErrorMessage {
    name: string,
    gender: string,
    email: string,
    password: string,
    password_confirmation: string
}

export const Register = React.memo(() => {

    const [fieldError, setFieldError] = React.useState<fieldError>({ name: false, gender: false, email: false, password: false, password_confirmation: false });
    const [fieldErrorMessage, setFieldErrorMessage] = React.useState<fieldErrorMessage>({ name: "", gender: "", email: "", password: "", password_confirmation: "" });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        if (formularyDataValidate(formData)) {

            serverRequestExecution(formData);

        }

    };

    const formularyDataValidate = (formData: FormData): Boolean => {

        const nameValidation: Validation = FormValidation(formData.get("name"), 3, null, null, "name");
        const genderValidation: Validation = FormValidation(formData.get("sex"), 3, null, null, "gender");
        const emailValidation: Validation = FormValidation(formData.get("email"), 3, null, null, "email");
        const passwordValidation: Validation = FormValidation(formData.get("password"), 3, null, null, "password");
        const passwordConfirmationValidation: Validation = formData.get("password") === formData.get("password_confirmation") ? { error: false, message: "" } : { error: true, message: "The passwords do not match" }

        setFieldError({ name: nameValidation.error, gender: genderValidation.error, email: emailValidation.error, password: passwordValidation.error, password_confirmation: passwordConfirmationValidation.error });
        setFieldErrorMessage({ name: nameValidation.message, gender: genderValidation.message, email: emailValidation.message, password: passwordValidation.message, password_confirmation: passwordConfirmationValidation.message });

        if (nameValidation.error || genderValidation.error || emailValidation.error || passwordValidation.error || passwordConfirmationValidation.error) {
            return false;
        } else {
            return true;
        }

    }

    const serverRequestExecution = (formData: FormData): void => {

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
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                error={fieldError.name}
                                helperText={fieldErrorMessage.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioForm name={"sex"} options={radio_options} row={true} />
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
                            />
                        </Grid>
                    </Grid>
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