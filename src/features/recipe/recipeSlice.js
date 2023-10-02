import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  recipes: [],
}

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes(state, action) {
      state.recipes = action.payload
    },
  },
})

export const { setRecipes } = recipeSlice.actions
export default recipeSlice.reducer
