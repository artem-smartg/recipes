import React, { FC } from 'react'

import { ContextProviderProps, ContextType } from '../types/context.type';
import recipeService from '../sevices/Recipe.services';
import cartStore from '../store/Cart.store';

export const Context = React.createContext<ContextType | null>(null)

export const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
    return (
        <Context.Provider value={{
            recipe: recipeService,
            cartStore: cartStore
        }}>
            {children}
        </Context.Provider>
    )
}
