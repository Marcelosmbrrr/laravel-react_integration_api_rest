import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// Router
import { Link } from "react-router-dom";
// Axios
import axios from 'axios';
// Custom
import { FormValidation } from '../../services/FormValidation';

export interface fieldError {
    email: boolean;
    password: boolean;
}

export interface fieldErrorMessage {
    email: string;
    password: string;
}

export interface Validation {
    error: boolean,
    message: string
}

export const Login = React.memo(() => {

    const [fieldError, setFieldError] = React.useState<fieldError>({ email: false, password: false });
    const [fieldErrorMessage, setFieldErrorMessage] = React.useState<fieldErrorMessage>({ email: "", password: "" });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData: FormData = new FormData(event.currentTarget);

        if (formularyDataValidate(formData)) {

            serverRequestExecution(formData);

        }
    }

    const formularyDataValidate = (formData: FormData) => {

        const emailValidation : Validation = FormValidation(formData.get("email"), null, null, null, null);
        const passwordValidation : Validation = FormValidation(formData.get("password"), null, null, null, null);

        setFieldError({ email: emailValidation.error, password: passwordValidation.error });
        setFieldErrorMessage({ email: emailValidation.message, password: passwordValidation.message });

        if (emailValidation.error || passwordValidation.error) {

            return false;

        } else {

            return true;

        }

    }

    const serverRequestExecution = (formData: FormData) => {

        axios.post('/api/login', formData)
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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={fieldError.email}
                        helperText={fieldErrorMessage.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        error={fieldError.password}
                        helperText={fieldErrorMessage.password}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="forgot-password">
                                <Typography>Forgot password?</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="register">
                                <Typography>Don't have an account? Sign Up</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
});