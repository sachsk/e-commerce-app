import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchCategories, fetchProductById, fetchProducts} from '../services/api';

export const getCategories = createAsyncThunk(
    'products/getCategories',
    async () => {
        const response = await fetchCategories();
        return response;
    }
);
export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        const response = await fetchProducts();
        return response;
    }
);

export const getProductById = createAsyncThunk(
    'products/getProductById',
    async (id) => {
        const response = await fetchProductById(id);
        return response;
    }
);


const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        categories: [],
        selectedProduct: null,
        loading: false,
        error: null,
        filters: {
            category: '',
            priceRange: '',
            sortBy: '',
        },
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = {...state.filters, ...action.payload};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
    },
});

export const {
    setFilters
} = productSlice.actions;
export default productSlice.reducer;