import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchRecipes = createAsyncThunk(
  "recipe/fetchRecipes",
  async function (query) {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}?search=${query}&key=${
        import.meta.env.VITE_KEY
      }`
    )
    const data = await res.json()
    return data.data.recipes
  }
)

export const fetchRecipe = createAsyncThunk(
  "recipe/fetchRecipe",
  async function (id) {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}${id}?key=${import.meta.env.VITE_KEY}`
    )
    const data = await res.json()
    return data.data.recipe
  }
)

const initialState = {
  recipes: [],
  recipe: {},
  bookmarks: [],
  showModal: false,
  statusRecipes: "idle",
  statusRecipe: "idle",
  error: "",
}

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    addBookmark(state, action) {
      state.bookmarks.push(action.payload)
    },
    removeBookmark(state, action) {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.id !== action.payload
      )
    },
    setShowModal(state, action) {
      state.showModal = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.statusRecipes = "loading"
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload
        state.statusRecipes = "idle"
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.statusRecipes = "error"
        state.error =
          "There was a problem fetching the recipes. Please try again later."
      })
      .addCase(fetchRecipe.pending, (state) => {
        state.statusRecipe = "loading"
      })
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        state.recipe = action.payload
        state.statusRecipe = "idle"
      })
      .addCase(fetchRecipe.rejected, (state) => {
        state.statusRecipe = "error"
        state.error =
          "There was a problem fetching the recipe. Please try again later."
      }),
})

export const getRecipes = (state) => state.recipe.recipes
export const getRecipe = (state) => state.recipe.recipe

export const getBookmarks = (state) => state.recipe.bookmarks

export const isBookmarked = (state, id) =>
  state.recipe.bookmarks.some((bookmark) => bookmark.id === id)

export const { setShowModal, addBookmark, removeBookmark } = recipeSlice.actions
export default recipeSlice.reducer
