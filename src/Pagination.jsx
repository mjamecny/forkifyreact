import { useDispatch, useSelector } from "react-redux"
import { setCurrentPage } from "./features/recipe/recipeSlice"

export default function Pagination({ numPages }) {
  const dispatch = useDispatch()
  const currentPage = useSelector((state) => state.recipe.currentPage)

  return (
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
  )
}
