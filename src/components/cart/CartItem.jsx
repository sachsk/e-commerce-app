import React from 'react';
import {Box, Card, CardContent, CardMedia, IconButton, TextField, Typography,} from '@mui/material';
import {Delete} from '@mui/icons-material';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <Card sx={{ display: 'flex', mb: 2 }}>
            <CardMedia
                component="img"
                sx={{ width: 140, objectFit: 'contain', p: 1 }}
                image={item.image}
                alt={item.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent>
                    <Typography variant="h6" noWrap>
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ${item.price} each
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <TextField
                            type="number"
                            size="small"
                            value={item.quantity}
                            onChange={(e) => onUpdateQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            InputProps={{ inputProps: { min: 1 } }}
                            sx={{ width: 70 }}
                        />
                        <Typography variant="body1" sx={{ ml: 2 }}>
                            Total: ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <IconButton
                            color="error"
                            onClick={onRemove}
                            sx={{ ml: 'auto' }}
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CartItem;