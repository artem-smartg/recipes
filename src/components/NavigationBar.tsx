import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NavigationBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/all-recipe"
          sx={{
            flexGrow: 1, textDecoration: 'none', color: 'inherit', cursor: 'pointer',
          }}
        >
          Recipe App
        </Typography>

        <IconButton
          component={Link}
          to="/favorite"
          color="inherit"
          aria-label="Go to favorites"
          sx={{ ml: 'auto' }}
        >
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
