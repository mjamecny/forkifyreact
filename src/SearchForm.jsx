import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { setRecipes, setIsLoading } from "./features/recipe/recipeSlice"

export default function SearchForm() {
  const [query, setQuery] = useState("")

  const isLoading = useSelector((state) => state.recipe.isLoading)
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()

    if (!query) return

    async function getRecipes() {
      dispatch(setIsLoading(true))
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}?search=${query}&key=${
          import.meta.env.VITE_KEY
        }`
      )
      const data = await res.json()

      dispatch(setRecipes(data.data.recipes))
      dispatch(setIsLoading(false))
      setQuery("")
    }

    getRecipes()
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn search__btn">
        <svg className="search__icon">
          <use href="icons.svg#icon-search"></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  )
}
