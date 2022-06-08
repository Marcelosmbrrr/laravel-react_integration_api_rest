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
// Libs
import { Link } from "react-router-dom";
import axios from 'axios';
// Custom
import { FormValidation } from '../../services/FormValidation';
// Types
import { Response } from '../../common/types';
import { FieldError } from '../../common/types';
import { FieldErrorMessage } from '../../common/types';
import { Validation } from '../../common/types';
import { FormData } from '../../common/types';

export const Login = React.memo(() => {

    const [formData, setFormData] = React.useState<FormData>({ email: null, password: null });
    const [fieldError, setFieldError] = React.useState<FieldError>({ email: false, password: false });
    const [fieldErrorMessage, setFieldErrorMessage] = React.useState<FieldErrorMessage>({ email: "", password: "" });
    const [serverResponse, setServerResponse] = React.useState<Response>({ status: false, error: false, message: "" });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formularyDataValidate()) {

            serverRequestExecution();

        }
    }

    const formularyDataValidate = () => {

        const emailValidation: Validation = FormValidation(formData.email, null, null, null, null);
        const passwordValidation: Validation = FormValidation(formData.password, null, null, null, null);

        setFieldError({ email: emailValidation.error, password: passwordValidation.error });
        setFieldErrorMessage({ email: emailValidation.message, password: passwordValidation.message });

        if (emailValidation.error || passwordValidation.error) {

            return false;

        } else {

            return true;

        }

    }

    const serverRequestExecution = () => {

        axios.post('http://127.0.0.1:8000/api/login', formData)
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