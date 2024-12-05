import recipeService from "../sevices/Recipe.services";
import { ReactNode } from 'react'
import cartStore from "../store/Cart.store";

export interface ContextType {
    recipe: typeof recipeService
    cartStore: typeof cartStore
}

export interface ContextProviderProps {
    children: ReactNode;
}