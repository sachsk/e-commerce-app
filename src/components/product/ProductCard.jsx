import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Rating, Typography,} from '@mui/material';
import {useCart} from '../../hooks/useCart';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addItem } = useCart();

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: 'contain', p: 2 }}
                loading="lazy"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2" noWrap>
                    {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {product.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Rating value={product.rating.rate} precision={0.5} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        ({product.rating.count})
                    </Typography>
                </Box>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ${product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => navigate(`/product/${product.id}`)}
                >
                    View Details
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => addItem(product)}
                >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;