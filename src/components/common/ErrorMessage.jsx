import React from 'react';
import {Alert, Box} from '@mui/material';

const ErrorMessage = ({ message }) => (
    <Box sx={{ p: 2 }}>
        <Alert severity="error">{message}</Alert>
    </Box>
);

export default ErrorMessage;