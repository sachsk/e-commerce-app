import React, {useEffect, useState} from 'react';
import {Box, Container, Grid, Pagination, Typography,} from '@mui/material';
import {useProducts} from '../hooks/useProducts';
import ProductCard from '../components/product/ProductCard';
import ProductFilters from '../components/product/ProductFilters';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const ProductList = () => {
    const {
        products,
        loading,
        error,
        filters,
        fetchProducts,
        updateFilters
    } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchProducts();
    }, []);

    // Apply filters whenever products or filters change
    useEffect(() => {
        if (products.length) {
            let result = [...products];

            if (filters.category) {
                result = result.filter(product => product.category === filters.category);
            }

            if (filters.priceRange && Array.isArray(filters.priceRange)) {
                const [min, max] = filters.priceRange;
                result = result.filter(product =>
                    product.price >= min && product.price <= max
                );
            }

            if (filters.sortBy) {
                switch (filters.sortBy) {
                    case 'price_asc':
                        result.sort((a, b) => a.price - b.price);
                        break;
                    case 'price_desc':
                        result.sort((a, b) => b.price - a.price);
                        break;
                    case 'rating':
                        result.sort((a, b) => b.rating.rate - a.rating.rate);
                        break;
                    default:
                        break;
                }
            }

            setFilteredProducts(result);
            setPage(1); // Reset to first page when filters change
        }
    }, [products, filters]);

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    // Calculate pagination
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProducts = filteredProducts.slice(startIndex, endIndex);
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleFilterChange = (newFilters) => {
        updateFilters(newFilters);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Our Products
            </Typography>

            <Grid container spacing={3}>
                {/* Filters */}
                <Grid item xs={12} md={3}>
                    <ProductFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />
                </Grid>

                {/* Product Grid */}
                <Grid item xs={12} md={9}>
                    {filteredProducts.length === 0 ? (
                        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                            No products found matching your criteria
                        </Typography>
                    ) : (
                        <>
                            <Typography variant="subtitle1" gutterBottom>
                                Showing {filteredProducts.length} products
                            </Typography>
                            <Grid container spacing={3}>
                                {displayedProducts.map((product) => (
                                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                                        <ProductCard product={product} />
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Pagination */}
                            {pageCount > 1 && (
                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                    <Pagination
                                        count={pageCount}
                                        page={page}
                                        onChange={(_, value) => setPage(value)}
                                        color="primary"
                                    />
                                </Box>
                            )}
                        </>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductList;