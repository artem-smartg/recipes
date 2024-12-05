
import { makeAutoObservable } from 'mobx';
import { Meal } from '../types/Meal.type';
import recipeService from '../sevices/Recipe.services';

class CartStore {
    favorites: any[] = [];
    meal: any = null;
    isLoading: boolean = false;
    error: string | null = null;

    searchTerm: string = '';
    allMeals: any[] = [];
    categories: Array<{ idCategory: string; strCategory: string }> = [];
    currentCategory: string = "";
    filteredMeals: any[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setSearchTerm(searchTerm: string) {
        this.searchTerm = searchTerm;
        this.searchMealByName(searchTerm); 
    }

    setCategory(category: string) {
        this.currentCategory = category;
        this.applyCategoryFilter(); 
    }

    applyCategoryFilter() {
        if (this.currentCategory) {
            this.filteredMeals = this.allMeals.filter((meal) => meal.strCategory === this.currentCategory);
        } else {
            this.filteredMeals = this.allMeals;
        }
    }

    async searchMealByName(searchTerm: string) {
        this.isLoading = true;
        this.error = null;
        try {
            const response = await recipeService.searchMealByName(searchTerm);
            this.allMeals = response.meals || [];
            this.filteredMeals = this.allMeals;
            this.applyCategoryFilter();
        } catch (error) {
            this.error = 'Error fetching meals';
        } finally {
            this.isLoading = false;
        }
    }

    async listMealsByFirstLetter(letter: string) {
        this.isLoading = true;
        this.error = null;
        try {
            const response = await recipeService.listMealsByFirstLetter(letter);
            this.allMeals = response.meals || [];
            this.filteredMeals = this.allMeals;
            this.applyCategoryFilter();
        } catch (error) {
            this.error = 'Error fetching meals';
        } finally {
            this.isLoading = false;
        }
    }

    async fetchCategories() {
        this.isLoading = true;
        this.error = null;
        try {
            const response = await recipeService.getCategories();
            this.categories = response.categories || [];
        } catch (error) {
            this.error = 'Error fetching categories';
        } finally {
            this.isLoading = false;
        }
    }

    /////////////////////////////////

    async fetchMealById(id: string) {
        this.isLoading = true;
        this.error = null;
        try {
            const response = await recipeService.getMealById(id)
            this.meal = response.meals ? response.meals[0] : null;
        } catch (error) {
            this.error = 'Error fetching meal details';
        } finally {
            this.isLoading = false;
        }
    }


    addFavorite(meal: any) {
        if (!this.isFavorite(meal)) {
            this.favorites.push(meal);
        }
    }

    removeFavorite(meal: any) {
        this.favorites = this.favorites.filter(fav => fav.idMeal !== meal.idMeal);
    }

    isFavorite(meal: any): boolean {
        if (!meal) {
            return false;  
        }
        return this.favorites.some(fav => fav.idMeal === meal.idMeal);
    }

    toggleFavorite(meal: Meal) {
        if (this.isFavorite(meal)) {
            this.removeFavorite(meal);
        } else {
            this.addFavorite(meal);
        }
    }
}

const cartStore = new CartStore();
export default cartStore;