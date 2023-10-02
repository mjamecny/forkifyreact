import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  recipes: [],
  recipe: {},
  bookmarks: [],
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
    addBookmark(state, action) {
      state.bookmarks.push(action.payload)
    },
    removeBookmark(state, action) {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.id !== action.payload
      )
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
  },
})

export const getRecipes = (state) => state.recipe.recipes
export const getRecipe = (state) => state.recipe.recipe

export const isBookmarked = (state, id) =>
  state.recipe.bookmarks.some((bookmark) => bookmark.id === id)

export const {
  setRecipes,
  setRecipe,
  setIsLoading,
  addBookmark,
  removeBookmark,
} = recipeSlice.actions
export default recipeSlice.reducer
