import {useDispatch, useSelector} from 'react-redux';
import {getCategories, getProductById, getProducts, setFilters} from '../store/productSlice';

export const useProducts = () => {
    const dispatch = useDispatch();
    const {items,categories, selectedProduct, loading, error, filters} = useSelector(
        (state) => state.products
    );

    const fetchProducts = () => dispatch(getProducts());
    const fetchProductById = (id) => dispatch(getProductById(id));
    const fetchCategories = () => dispatch(getCategories());
    const updateFilters = (filters) => dispatch(setFilters(filters));

    return {
        products: items,
        selectedProduct,
        loading,
        error,
        filters,
        categories,
        fetchProducts,
        fetchProductById,
        fetchCategories,
        updateFilters,
    };
};