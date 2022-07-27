import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
// Router
import { Link } from 'react-router-dom';

const PageStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const BoxStyle = {
    width: 400,
    height: 150,
    backgroundColor: '#FAFBFD',
    borderRadius: "10px",
    boxShadow: "0px 2px 6px 0px rgba(224,224,224,1)"
}

export function NotFound() {
    return (

        <Box sx={{ ...PageStyle }}>
            <Grid spacing={2} container sx={{ ...BoxStyle }}>
                <Grid item xs={12} textAlign="center">
                    PAGE NOT FOUND
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <Link to="/">Go back to login</Link>
                </Grid>
            </Grid>
        </Box>

    );
}
