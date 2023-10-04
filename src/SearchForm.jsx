import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"

import { fetchRecipes, setCurrentPage } from "./features/recipe/recipeSlice"

export default function SearchForm() {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const inputRef = useRef(null)

  function handleSubmit(event) {
    event.preventDefault()
    if (!query) return
    dispatch(fetchRecipes(query))
    setQuery("")
    dispatch(setCurrentPage(1))
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "/") {
        event.preventDefault()
        inputRef.current.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search__field"
        placeholder="Click on / to start searching recipes"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
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
