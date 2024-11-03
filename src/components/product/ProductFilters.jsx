import React, {useEffect} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, Typography,} from '@mui/material';
import {useProducts} from '../../hooks/useProducts';

const ProductFilters = ({ filters, onFilterChange }) => {
    const { categories, fetchCategories } = useProducts();

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleReset = () => {
        onFilterChange({
            category: '',
            priceRange: [0, 1000],
            sortBy: '',
        });
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Filters</Typography>
                <Button size="small" onClick={handleReset}>
                    Reset All
                </Button>
            </Box>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                    value={filters.category}
                    label="Category"
                    onChange={(e) => onFilterChange({ category: e.target.value })}
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Price Range</Typography>
                <Slider
                    value={filters.priceRange || [0, 1000]}
                    onChange={(_, newValue) => onFilterChange({ priceRange: newValue })}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    step={10}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">
                        ${filters.priceRange ? filters.priceRange[0] : 0}
                    </Typography>
                    <Typography variant="body2">
                        ${filters.priceRange ? filters.priceRange[1] : 1000}
                    </Typography>
                </Box>
            </Box>

            <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                    value={filters.sortBy}
                    label="Sort By"
                    onChange={(e) => onFilterChange({ sortBy: e.target.value })}
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="price_asc">Price: Low to High</MenuItem>
                    <MenuItem value="price_desc">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default ProductFilters;