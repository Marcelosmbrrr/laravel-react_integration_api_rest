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
import { Response } from '../../common/types';
import { FieldError } from '../../common/types';
import { FieldErrorMessage } from '../../common/types';
import { Validation } from '../../common/types';
import { FormData } from '../../common/types';

const radio_options: { value: string, label: string }[] = [
    { value: "m", label: "Male" },
    { value: "f", label: "Female" }
];

export const Register = React.memo(() => {

    const [formData, setFormData] = React.useState<FormData>({ name: null, sex: null, email: null, password: null, password_confirmation: null });
    const [fieldError, setFieldError] = React.useState<FieldError>({ name: false, sex: false, email: false, password: false, password_confirmation: false });
    const [fieldErrorMessage, setFieldErrorMessage] = React.useState<FieldErrorMessage>({ name: "", sex: "", email: "", password: "", password_confirmation: "" });
    const [serverResponse, setServerResponse] = React.useState<Response>({ status: false, error: false, message: "" });

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

        const nameValidation: Validation = FormValidation(formData.name, 3, null, null, "name");
        const sexValidation: Validation = FormValidation(formData.sex, null, null, null, "sex");
        const emailValidation: Validation = FormValidation(formData.email, 3, null, null, "email");
        const passwordValidation: Validation = FormValidation(formData.password, 5, null, null, "password");
        const passwordConfirmationValidation: Validation = formData.password === formData.password_confirmation ? { error: false, message: "" } : { error: true, message: "The passwords do not match" }

        setFieldError({ name: nameValidation.error, sex: sexValidation.error, email: emailValidation.error, password: passwordValidation.error, password_confirmation: passwordConfirmationValidation.error });
        setFieldErrorMessage({ name: nameValidation.message, sex: sexValidation.message, email: emailValidation.message, password: passwordValidation.message, password_confirmation: passwordConfirmationValidation.message });

        if (nameValidation.error || sexValidation.error || emailValidation.error || passwordValidation.error || passwordConfirmationValidation.error) {
            return false;
        } else {
            return true;
        }

    }

    const serverRequestExecution = (): void => {

        AxiosApi.post('http://127.0.0.1:8000/api/register', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {

                setServerResponse({ status: true, error: false, message: response.data.message });

            })
            .catch(function (error) {
                
                setServerResponse({ status: true, error: true, message: error.message });

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