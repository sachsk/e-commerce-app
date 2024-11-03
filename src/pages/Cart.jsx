import React from 'react';
import {Box, Button, Container, Grid, Typography,} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useCart} from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

const Cart = () => {
    const navigate = useNavigate();
    const {
        items,
        totalItems,
        totalAmount,
        removeItem,
        updateItemQuantity,
        emptyCart
    } = useCart();

    if (items.length === 0) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Your cart is empty
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/')}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    {items.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onUpdateQuantity={(quantity) => updateItemQuantity(item.id, quantity)}
                            onRemove={() => removeItem(item.id)}
                        />
                    ))}

                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={emptyCart}
                        >
                            Clear Cart
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <CartSummary
                        totalItems={totalItems}
                        totalAmount={totalAmount}
                        onCheckout={() => {
                            // Implement checkout logic
                            alert('Checkout functionality would be implemented here');
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;