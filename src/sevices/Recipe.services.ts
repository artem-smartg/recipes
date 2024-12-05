import { Meal } from "../types/Meal.type";

class RecipeService {
  private baseUrl = "https://www.themealdb.com/api/json/v1/1";

  // Поиск рецепта по имени
  async searchMealByName(name: string): Promise<{ meals: Meal[] }> {
    const response = await fetch(`${this.baseUrl}/search.php?s=${name}`);
    const data = await response.json();
    console.log(data)
    return data;
  }

  // Список всех рецептов по первой букве
  async listMealsByFirstLetter(letter: string): Promise<{ meals: Meal[] }> {
    const response = await fetch(`${this.baseUrl}/search.php?f=${letter}`);
    const data = await response.json();
    return data;
  }

  // Получение полного рецепта по ID
  async getMealById(id: string) {
    const response = await fetch(`${this.baseUrl}/lookup.php?i=${id}`);
    return response.json();
  }

  // Получение случайного рецепта
  async getRandomMeal() {
    const response = await fetch(`${this.baseUrl}/random.php`);
    return response.json();
  }

  // Список всех категорий
  async getCategories() {
    const response = await fetch(`${this.baseUrl}/categories.php`);
    return response.json();
  }

  // Фильтрация по основному ингредиенту
  async filterByMainIngredient(ingredient: string) {
    const response = await fetch(`${this.baseUrl}/filter.php?i=${ingredient}`);
    return response.json();
  }

  // Фильтрация по категории
  async filterByCategory(category: string) {
    const response = await fetch(`${this.baseUrl}/filter.php?c=${category}`);
    return response.json();
  }

  // Фильтрация по региону
  async filterByArea(area: string) {
    const response = await fetch(`${this.baseUrl}/filter.php?a=${area}`);
    return response.json();
  }
}

const recipeService = new RecipeService();
export default recipeService
