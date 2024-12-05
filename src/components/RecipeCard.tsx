import React, { useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Context } from '../context/ContextProvider';
import { ContextType } from '../types/context.type';
import { observer } from 'mobx-react-lite';
import { RecipeCardProps } from '../types/RecipeCard.type';


const RecipeCard: React.FC<RecipeCardProps> = ({ meal }) => {
  const { cartStore } = useContext(Context) as ContextType;
  const navigate = useNavigate();
  const isFavorite = cartStore.isFavorite(meal);

  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    cartStore.toggleFavorite(meal);
  };

  return (
    <Card
      onClick={() => navigate(`/recipe/${meal.idMeal}`)}
      sx={{ maxWidth: 280, margin: 2, height: 350, position: 'relative' }}
      component="div"
      style={{ cursor: 'pointer' }}
    >
      <CardMedia
        component="img"
        height="140"
        image={meal.strMealThumb}
        alt={meal.strMeal}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {meal.strMeal}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Category:</strong> {meal.strCategory}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Area:</strong> {meal.strArea}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Instructions:</strong> {meal.strInstructions.slice(0, 100)}...
        </Typography>

        <IconButton
          onClick={handleFavoriteClick}
          sx={{ position: 'absolute', bottom: 8, right: 8, zIndex: 1 }}
        >
          <FavoriteIcon color={isFavorite ? 'error' : 'disabled'} />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default observer(RecipeCard);
