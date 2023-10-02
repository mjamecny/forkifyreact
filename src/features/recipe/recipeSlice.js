import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  recipes: [],
  recipe: {},
  isLoading: false,
}

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes(state, action) {
      state.recipes = action.payload
    },
    setRecipe(state, action) {
      state.recipe = action.payload
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
  },
})

export const getRecipes = (state) => state.recipe.recipes

export const { setRecipes, setRecipe, setIsLoading } = recipeSlice.actions
export default recipeSlice.reducer
