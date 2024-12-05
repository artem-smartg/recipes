import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllRecipes from './AllRecipes';
import  FavoritesPage  from './FavoritesPage';
import  RecipeDetail  from './RecipeDetail';


export const Approuter: React.FC = () => {
  return (
    <div>
        <Routes>
          <Route path="/all-recipe" element={<AllRecipes />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/favorite" element={<FavoritesPage />} />
        </Routes>
    
    </div>
  )
}
