import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Button, Container, Grid, Paper, Rating, Typography,} from '@mui/material';
import {ArrowBack} from '@mui/icons-material';
import {useProducts} from '../hooks/useProducts';
import {useCart} from '../hooks/useCart';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { selectedProduct, loading, error, fetchProductById } = useProducts();
    const { addItem } = useCart();

    useEffect(() => {
        console.log('number===>',id)
        fetchProductById(id);
    }, [id]);

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;
    if (!selectedProduct) return null;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{ mb: 3 }}
            >
                Back to Products
            </Button>

            <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: '500px',
                                objectFit: 'contain',
                            }}
                            loading="lazy"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                            {selectedProduct.title}
                        </Typography>

                        <Box sx={{ my: 2 }}>
                            <Rating
                                value={selectedProduct.rating.rate}
                                precision={0.5}
                                readOnly
                            />
                            <Typography variant="body2" color="text.secondary">
                                ({selectedProduct.rating.count} reviews)
                            </Typography>
                        </Box>

                        <Typography variant="h5" color="primary" sx={{ my: 2 }}>
                            ${selectedProduct.price}
                        </Typography>

                        <Typography variant="body1" sx={{ my: 3 }}>
                            {selectedProduct.description}
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => addItem(selectedProduct)}
                            sx={{ mt: 2 }}
                        >
                            Add to Cart
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ProductDetail;