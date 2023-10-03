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

export const uploadRecipe = createAsyncThunk(
  "recipe/uploadRecipe",
  async function (recipe) {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}?key=${import.meta.env.VITE_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      }
    )
    const data = await res.json()
    return data.data.recipe
  }
)

const initialState = {
  recipes: [],
  recipe: {},
  bookmarks: [],
  currentPage: 1,
  showModal: false,
  statusRecipes: "idle",
  statusRecipe: "idle",
  statusUpload: "idle",
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload
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
      })
      .addCase(uploadRecipe.pending, (state) => {
        state.statusUpload = "loading"
      })
      .addCase(uploadRecipe.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload)
        state.statusUpload = "idle"
      })
      .addCase(uploadRecipe.rejected, (state) => {
        state.statusUpload = "error"
        state.error =
          "There was a problem uploading the recipe. Please try again later."
      }),
})

export const getRecipes = (state) => state.recipe.recipes
export const getRecipe = (state) => state.recipe.recipe

export const getBookmarks = (state) => state.recipe.bookmarks

export const isBookmarked = (state, id) =>
  state.recipe.bookmarks.some((bookmark) => bookmark.id === id)

export const { setShowModal, addBookmark, removeBookmark, setCurrentPage } =
  recipeSlice.actions
export default recipeSlice.reducer
