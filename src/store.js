import { configureStore } from "@reduxjs/toolkit"

import recipeReducer from "./features/recipe/recipeSlice"
import { saveBookmarksToLocalStorage } from "./features/recipe/recipeSlice"

const store = configureStore({
  reducer: { recipe: recipeReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveBookmarksToLocalStorage),
})

export default store
