import { useState } from "react"
import { useDispatch } from "react-redux"

import { setRecipes } from "./features/recipe/recipeSlice"

export default function SearchForm() {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()

    if (!query) return

    async function getRecipes() {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}?search=${query}&key=${
          import.meta.env.VITE_KEY
        }`
      )
      const data = await res.json()

      dispatch(setRecipes(data.data.recipes))
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
