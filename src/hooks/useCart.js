import { useSelector, useDispatch } from 'react-redux';
import {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
} from '../store/cartSlice';

export const useCart = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.cart);

    const addItem = (product) => dispatch(addToCart(product));
    const removeItem = (productId) => dispatch(removeFromCart(productId));
    const updateItemQuantity = (id, quantity) =>
        dispatch(updateQuantity({ id, quantity }));
    const emptyCart = () => dispatch(clearCart());

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return {
        items,
        loading,
        error,
        totalItems,
        totalAmount,
        addItem,
        removeItem,
        updateItemQuantity,
        emptyCart,
    };
};