import { useState } from "react"
import { useDispatch } from "react-redux"

import { fetchRecipes, setCurrentPage } from "./features/recipe/recipeSlice"

export default function SearchForm() {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    if (!query) return
    dispatch(fetchRecipes(query))
    setQuery("")
    dispatch(setCurrentPage(1))
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
