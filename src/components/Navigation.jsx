import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Badge,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { ShoppingCart, Person, Logout, DarkMode, LightMode } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import techHubLight from '../assets/techhub-light.png';
import techHubDark from '../assets/techhub-dark.png';

const Navigation = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();


    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <AppBar position="static" sx={{display:{md:'block', sm:'none', xs:'none', xxs:'none'}}} >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img 
            src={darkMode ? techHubLight : techHubDark} 
            alt="TechHub Logo" 
            style={{ 
              height: '40px', 
              marginRight: '12px',
              cursor: 'pointer'
            }}
            onClick={() => user && navigate('/products')}
          />
          <Typography variant="h6">
            E-Commerce App
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          
          {user && (
            <>
              <Button color="inherit" component={Link} to="/products">
                Products
              </Button>
              
              <Button color="inherit" component={Link} to="/users">
                <Person sx={{ mr: 1 }} />
                Users
              </Button>
              
              <Button color="inherit" component={Link} to="/cart">
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCart />
                </Badge>
              </Button>
              
              <Button color="inherit" onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} />
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
    <AppBar position="static" sx={{display:{sm:'flex', md:'none'} }} >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img 
            src={darkMode ? techHubLight : techHubDark} 
            alt="TechHub Logo" 
            style={{ 
              height: '40px', 
              marginRight: '12px',
              cursor: 'pointer'
            }}
            onClick={() => user && navigate('/products')}
          />
          <Typography variant="h6">
            E-Commerce App
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {user ?(
            <>
            <Button color="inherit" component={Link} to="/cart">
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCart />
                  </Badge>
                </Button>
              <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              >
                <MenuIcon color='action' />
              </Button>
              <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-button',
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                <Button color="inherit" component={Link} to="/products">
                  Products
                </Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button color="inherit" component={Link} to="/users">
                  <Person sx={{ mr: 1 }} />
                  Users
                </Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button color="inherit" onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} />
                  Logout
                </Button>
              </MenuItem>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Menu>
            </>
          ):(
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
    </>
    
  );
};

export default Navigation;