import { 
  Container, 
  Grid,
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Chip,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useLocation  } from 'react-router';

const Product = () => {
  const product = useLocation().state

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" textAlign='center' gutterBottom>
          Product {product.id}
        </Typography>
          <Grid container>
            <Grid size={{ xs: 12, sm: 6, md: 4 }} offset={4} >
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                />
                <CardContent >
                  <Typography sx={{ flexGrow: 1 }} variant="h6" gutterBottom>
                    {product.title.length > 50 
                      ? `${product.title.substring(0, 50)}...` 
                      : product.title
                    }
                  </Typography>
                  
                  <Chip 
                    label={product.category} 
                    size="small" 
                    sx={{ mb: 1 }} 
                  />
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {product.description.length > 100 
                      ? `${product.description.substring(0, 100)}...` 
                      : product.description
                    }
                  </Typography>
                  
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    ${product.price}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCart />}
                    onClick={(e) => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
        </Grid>    
      </Box>
    </Container>
  );
};

export default Product;