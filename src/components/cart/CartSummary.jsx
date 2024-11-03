import React from 'react';
import {Box, Button, Divider, Paper, Typography,} from '@mui/material';

const CartSummary = ({ totalItems, totalAmount, onCheckout }) => {
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Order Summary
            </Typography>
            <Box sx={{ my: 2 }}>
                <Typography>Items: {totalItems}</Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                    Total: ${totalAmount.toFixed(2)}
                </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onCheckout}
            >
                Proceed to Checkout
            </Button>
        </Paper>
    );
};

export default CartSummary;