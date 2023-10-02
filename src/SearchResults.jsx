import { useSelector } from "react-redux"

import SearchResultsItem from "./SearchResultsItem"
import Spinner from "./Spinner"

import { getRecipes } from "./features/recipe/recipeSlice"

export default function SearchResults() {
  const recipes = useSelector(getRecipes)
  const isLoading = useSelector((state) => state.recipe.isLoading)

  return (
    <div className="search-results">
      <ul className="results">
        {isLoading ? (
          <Spinner />
        ) : (
          recipes.map((recipe) => (
            <SearchResultsItem key={recipe.id} recipe={recipe} />
          ))
        )}
      </ul>
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
