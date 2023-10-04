import { useSelector } from "react-redux"

import SearchResultsItem from "./SearchResultsItem"
import Spinner from "./Spinner"
import Error from "./Error"
import Pagination from "./Pagination"

import { getRecipes } from "./features/recipe/recipeSlice"

export default function SearchResults() {
  const recipes = useSelector(getRecipes)
  const { statusRecipes, currentPage } = useSelector((state) => state.recipe)
  const resPerPage = import.meta.env.VITE_RES_PER_PAGE
  const numPages = Math.ceil(recipes.length / resPerPage)

  const recipesSlice = recipes.slice(
    Math.abs(resPerPage - currentPage * resPerPage),
    currentPage * resPerPage
  )

  return (
    <div className="search-results">
      <ul className="results">
        {statusRecipes === "loading" ? (
          <Spinner />
        ) : recipes.length === 0 ? (
          <Error msg="No recipes found for your query. Please try again!" />
        ) : (
          recipesSlice.map((recipe) => (
            <SearchResultsItem key={recipe.id} recipe={recipe} />
          ))
        )}
      </ul>
      <Pagination numPages={numPages} />
      <p className="copyright">
        &copy; Copyright by
        <a className="twitter-link" href="https://twitter.com/jonasschmedtman">
          Jonas Schmedtmann
        </a>
        . Use for learning or your portfolio. Don't use to teach. Don't claim as
        your own.
      </p>
    </div>
  )
}
