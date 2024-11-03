import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/common/Header';
import Loading from './components/common/Loading';

// Lazy load pages
const ProductList = React.lazy(() => import('./pages/ProductList'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const Cart = React.lazy(() => import('./pages/Cart'));

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Header/>
                <Suspense fallback={<Loading/>}>
                    <Routes>
                        <Route path="/" element={<ProductList/>}/>
                        <Route path="/product/:id" element={<ProductDetail/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                    </Routes>
                </Suspense>
            </Router>
        </ThemeProvider>
    );
}

export default App;
