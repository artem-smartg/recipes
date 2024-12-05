import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../context/ContextProvider';
import { ContextType } from '../types/context.type';
import { Card, CardContent, CardMedia, Typography, Button, Grid  } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { observer } from 'mobx-react-lite';


const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cartStore } = useContext(Context) as ContextType;

  const { meal, isLoading, error } = cartStore;

  const isFavorite = cartStore.isFavorite(meal);

  const handleFavoriteToggle = () => {
    if (isFavorite) cartStore.removeFavorite(meal);
    else cartStore.addFavorite(meal);
  };

  useEffect(() => {
    if (id) cartStore.fetchMealById(id); 
  }, [id, cartStore]);

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!meal) return <p>Recipe not found</p>


  return (
    <div>
      <Card sx={{ maxWidth: 1000, margin: 'auto', padding: 2, marginTop: 1 }}>
        <CardMedia
          component="img"
          height="400"
          image={meal.strMealThumb}
          alt={meal.strMeal}
        />
        <CardContent>
          <Grid container spacing={3}>
         
            <Grid item xs={12} md={4}>
              <Typography variant="h4" component="div">
                {meal.strMeal}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                <strong>Category:</strong> {meal.strCategory}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                <strong>Area:</strong> {meal.strArea}
              </Typography>
              {meal.strIngredient1 && (
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Ingredients:</strong>
                  <ul>
                    {Object.keys(meal).filter(key => key.startsWith('strIngredient') && meal[key]).map((key, index) => (
                      <li key={index}>{meal[key]}</li>
                    ))}
                  </ul>
                </Typography>
              )}
            </Grid>
  
          
            <Grid item xs={12} md={8}>
              <Typography variant="body1" color="text.secondary" paragraph>
                <strong>Instructions:</strong> {meal.strInstructions}
              </Typography>
            </Grid>
          </Grid>
          
          <Button
            onClick={handleFavoriteToggle}
            variant={isFavorite ? 'outlined' : 'contained'}
            startIcon={<FavoriteIcon />}
            sx={{ marginTop: 2 }}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};


export default observer(RecipeDetail);