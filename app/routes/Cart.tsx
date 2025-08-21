import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingBag,
  ArrowBack,
} from '@mui/icons-material';

const Cart: React.FC = () => {
  // TODO: Students should manage these with Zustand and React Hook Form
  const [openCheckout, setOpenCheckout] = React.useState(false);
  
  // TODO: Students should get cart data from Zustand store
  const mockCartItems = [
    // Example: { productId: '1', product: {...}, quantity: 2 }
  ] as any[];

  // TODO: Students should calculate totals
  const subtotal = 0;
  const shipping = 50;
  const total = subtotal + shipping;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => {
            // TODO: Students should implement navigation back to products
          }}
          sx={{ mr: 2 }}
        >
          Continue Shopping
        </Button>
        <Typography variant="h4" component="h1">
          Shopping Cart ({mockCartItems.length} items)
        </Typography>
      </Box>

      {mockCartItems.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <ShoppingBag sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Add some products to get started!
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              // TODO: Students should implement navigation to products
            }}
          >
            Browse Products
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Cart Items
                </Typography>
                
                <List>
                  {mockCartItems.map((item: any, index: number) => (
                    <React.Fragment key={index}>
                      <ListItem
                        sx={{
                          py: 2,
                          alignItems: 'flex-start'
                        }}
                      >
                        <ListItemAvatar sx={{ mr: 2 }}>
                          <Avatar
                            variant="rounded"
                            src={item.product?.image}
                            sx={{ width: 80, height: 80 }}
                          />
                        </ListItemAvatar>
                        
                        <ListItemText
                          primary={
                            <Typography variant="h6">
                              {item.product?.name}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {item.product?.description}
                              </Typography>
                              <Typography variant="h6" color="primary">
                                ฿{item.product?.price?.toLocaleString()}
                              </Typography>
                            </Box>
                          }
                        />
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                          {/* Quantity Controls */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => {
                                // TODO: Students should implement decrease quantity
                              }}
                            >
                              <Remove />
                            </IconButton>
                            
                            <Typography variant="body1" sx={{ mx: 1, minWidth: '30px', textAlign: 'center' }}>
                              {item.quantity}
                            </Typography>
                            
                            <IconButton
                              size="small"
                              onClick={() => {
                                // TODO: Students should implement increase quantity
                              }}
                            >
                              <Add />
                            </IconButton>
                          </Box>
                          
                          {/* Subtotal */}
                          <Typography variant="h6" color="primary">
                            ฿{((item.product?.price || 0) * (item.quantity || 0)).toLocaleString()}
                          </Typography>
                          
                          {/* Remove Button */}
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => {
                              // TODO: Students should implement remove from cart
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </ListItem>
                      
                      {index < mockCartItems.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Order Summary */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ position: 'sticky', top: 100 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal:</Typography>
                    <Typography>฿{subtotal.toLocaleString()}</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Shipping:</Typography>
                    <Typography>฿{shipping.toLocaleString()}</Typography>
                  </Box>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6" color="primary">
                      ฿{total.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => setOpenCheckout(true)}
                  disabled={mockCartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Checkout Dialog */}
      <Dialog open={openCheckout} onClose={() => setOpenCheckout(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Checkout</DialogTitle>
        
        <DialogContent>
          {/* TODO: Students should implement React Hook Form here */}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={3}
                variant="outlined"
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Postal Code"
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
          
          {/* Order Summary in Dialog */}
          <Paper sx={{ p: 2, mt: 3, bgcolor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Total Amount:</Typography>
              <Typography variant="h6" color="primary">
                ฿{total.toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setOpenCheckout(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={() => {
              // TODO: Students should implement order submission
              setOpenCheckout(false);
            }}
          >
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;