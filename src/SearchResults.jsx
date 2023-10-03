import { useDispatch, useSelector } from "react-redux"

import SearchResultsItem from "./SearchResultsItem"
import Spinner from "./Spinner"

import { getRecipes, setCurrentPage } from "./features/recipe/recipeSlice"

export default function SearchResults() {
  const dispatch = useDispatch()
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
        ) : (
          recipesSlice.map((recipe) => (
            <SearchResultsItem key={recipe.id} recipe={recipe} />
          ))
        )}
      </ul>
      <div className="pagination">
        {currentPage === 1 && numPages > 1 && (
          <button
            className="btn--inline pagination__btn--next"
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          >
            <span>Page {currentPage + 1}</span>
            <svg className="search__icon">
              <use href="icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
        )}
        {currentPage < numPages && currentPage > 1 && (
          <>
            <button
              className="btn--inline pagination__btn--prev"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              <svg className="search__icon">
                <use href="icons.svg#icon-arrow-left"></use>
              </svg>
              <span>Page {currentPage - 1}</span>
            </button>
            <button
              className="btn--inline pagination__btn--next"
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              <span>Page {currentPage + 1}</span>
              <svg className="search__icon">
                <use href="icons.svg#icon-arrow-right"></use>
              </svg>
            </button>
          </>
        )}
        {currentPage === numPages && numPages > 1 && (
          <button
            className="btn--inline pagination__btn--prev"
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          >
            <svg className="search__icon">
              <use href="icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page {currentPage - 1}</span>
          </button>
        )}
      </div>
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
