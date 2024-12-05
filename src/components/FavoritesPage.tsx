import { useContext, useState } from 'react';
import RecipeCard from './RecipeCard';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Context } from '../context/ContextProvider';
import { ContextType } from '../types/context.type';

const FavoritesRecipe: React.FC = () => {
  const { cartStore } = useContext(Context) as ContextType;


  const getAllIngredients = () => {
    const ingredients: Record<string, number> = {}; // unique
    cartStore.favorites.forEach((meal) => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient && ingredient.trim() !== '') {
          ingredients[ingredient] = (ingredients[ingredient] || 0) + 1;
        }
      }
    });
    return ingredients;
  };

  const allIngredients = getAllIngredients();

  return (
    <Box sx={{ margin: 4 }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>Favorites</Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cartStore.favorites.length === 0 ? (
          <Typography variant="body1">No favorites yet</Typography>
        ) : (
          cartStore.favorites.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))
        )}
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5">Combined Ingredients:</Typography>
        {cartStore.favorites.length > 0 ? (
          <ul>
            {Object.entries(allIngredients).map(([ingredient, count]) => (
              <li key={ingredient}>
                {ingredient} {count > 1 && `(${count}x)`}
              </li>
            ))}
          </ul>
        ) : (
          <Typography>No ingredients yet.</Typography>
        )}
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5">Instructions:</Typography>
        {cartStore.favorites.length > 0 ? (
          cartStore.favorites.map((meal) => (
            <Box key={meal.idMeal} sx={{ marginBottom: 2 }}>
              <Typography variant="h6">{meal.strMeal}</Typography>
              <Typography variant="body1">{meal.strInstructions}</Typography>
            </Box>
          ))
        ) : (
          <Typography>No instructions yet.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default observer(FavoritesRecipe);