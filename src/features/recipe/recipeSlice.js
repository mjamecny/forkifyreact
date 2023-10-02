import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  recipes: [],
  isLoading: false,
}

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes(state, action) {
      state.recipes = action.payload
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
  },
})

export const getRecipes = (state) => state.recipe.recipes

export const { setRecipes, setIsLoading } = recipeSlice.actions
export default recipeSlice.reducer
