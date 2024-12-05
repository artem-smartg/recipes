import React, { useContext, useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { Context } from '../context/ContextProvider';
import { ContextType } from '../types/context.type';
import { Pagination, TextField, Typography, Box, Select, MenuItem } from '@mui/material';
import paginationStyles from '../view/pagination';
import debounce from 'lodash.debounce';
import { SelectChangeEvent } from "@mui/material";
import { observer } from 'mobx-react-lite';

const AllRecipes: React.FC = () => {
    const { cartStore } = useContext(Context) as ContextType;

    const [currentPage, setCurrentPage] = useState(1);
    const mealsPerPage = 4;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        cartStore.setSearchTerm(e.target.value);
        cartStore.searchMealByName(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        cartStore.setCategory(event.target.value as string);
        setCurrentPage(1);
    };

    const indexOfLastMeal = currentPage * mealsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
    const currentMeals = cartStore.filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);

    // debounce lodash
    const debouncedSearch = debounce((term: string) => {
        cartStore.setSearchTerm(term);
        cartStore.searchMealByName(term);
    }, 400);

    useEffect(() => {
        debouncedSearch(cartStore.searchTerm);
        return () => {
            debouncedSearch.cancel(); 
        };
    }, [cartStore.searchTerm, debouncedSearch]);

    useEffect(() => {
        cartStore.listMealsByFirstLetter("b");
        cartStore.fetchCategories();
    }, [cartStore]);

    return (
        <div>
            <Typography sx={{ marginTop: 3 }} variant="h3" align="center" gutterBottom>
                All Recipes
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                <TextField
                    label="Search for a meal..."
                    variant="outlined"
                    value={cartStore.searchTerm}
                    onChange={handleSearchChange}
                    sx={{ width: 300 }}
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                <Select
                    value={cartStore.currentCategory}
                    onChange={handleCategoryChange}
                    displayEmpty
                    sx={{ width: 300 }}
                >
                    <MenuItem value="">
                        <em>All Categories</em>
                    </MenuItem>
                    {cartStore.categories.map((category) => (
                        <MenuItem key={category.idCategory} value={category.strCategory}>
                            {category.strCategory}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            <div className="recipe_cards">
                {currentMeals.length === 0 ? (
                    <Typography variant="body1" align="center">
                        No recipes found
                    </Typography>
                ) : (
                    currentMeals.map((meal) => <RecipeCard key={meal.idMeal} meal={meal} />)
                )}
            </div>

            <Pagination
                count={Math.ceil(cartStore.filteredMeals.length / mealsPerPage)}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                siblingCount={1}
                boundaryCount={1}
                sx={paginationStyles.pagination}
            />
        </div>
    );
};

export default observer(AllRecipes);
