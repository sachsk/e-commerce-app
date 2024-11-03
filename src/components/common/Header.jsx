import React from 'react';
import {useNavigate} from 'react-router-dom';
import {AppBar, Badge, Container, IconButton, Toolbar, Typography} from '@mui/material';
import {ShoppingCart} from '@mui/icons-material';
import {useCart} from '../../hooks/useCart';

const Header = () => {
    const navigate = useNavigate();
    const { totalItems } = useCart();

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        E-Commerce Store
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={() => navigate('/cart')}
                    >
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;