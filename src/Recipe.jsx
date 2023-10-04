import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Fraction from "fraction.js"

import Spinner from "./Spinner"

import {
  getRecipe,
  addBookmark,
  removeBookmark,
  isBookmarked,
  fetchRecipe,
  deleteRecipe,
} from "./features/recipe/recipeSlice"
import Error from "./Error"

export default function Recipe() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const recipe = useSelector(getRecipe)
  const {
    id: recipeId,
    image_url,
    title,
    publisher,
    cooking_time,
    servings,
    source_url,
    ingredients,
  } = recipe
  const { statusRecipe, error } = useSelector((state) => state.recipe)
  const bookmarked = useSelector((state) => isBookmarked(state, recipeId))

  const [servingsCount, setServingsCount] = useState(null)

  useEffect(() => {
    dispatch(fetchRecipe(id))
  }, [id, dispatch])

  useEffect(() => {
    if (servings) setServingsCount(servings)
  }, [servings])

  function handleBookmark() {
    if (!bookmarked) dispatch(addBookmark(recipe))
    else dispatch(removeBookmark(id))
  }

  function handleDelete() {
    dispatch(deleteRecipe(id))
    dispatch(removeBookmark(id))
    navigate("/")
  }

  function handleDecreaseServings() {
    if (servingsCount === 1) return
    setServingsCount(servingsCount - 1)
  }
  function handleIncreaseServings() {
    setServingsCount(servingsCount + 1)
  }

  return (
    <div className="recipe">
      {statusRecipe === "loading" ? (
        <Spinner />
      ) : statusRecipe === "error" ? (
        <Error msg={error} />
      ) : (
        <>
          <figure className="recipe__fig">
            <img src={image_url} alt="Tomato" className="recipe__img" />
            <h1 className="recipe__title">
              <span>{title}</span>
            </h1>
          </figure>

          <div className="recipe__details">
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href="icons.svg#icon-clock"></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--minutes">
                {cooking_time}
              </span>
              <span className="recipe__info-text">minutes</span>
            </div>
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href="icons.svg#icon-users"></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--people">
                {servingsCount}
              </span>
              <span className="recipe__info-text">servings</span>

              <div className="recipe__info-buttons">
                <button
                  className="btn--tiny btn--increase-servings"
                  onClick={handleDecreaseServings}
                >
                  <svg>
                    <use href="icons.svg#icon-minus-circle"></use>
                  </svg>
                </button>
                <button
                  className="btn--tiny btn--increase-servings"
                  onClick={handleIncreaseServings}
                >
                  <svg>
                    <use href="icons.svg#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>
            <div
              className={`recipe__delete-btn ${
                recipe.hasOwnProperty("key") ? "" : "hidden"
              }`}
            >
              <button className="btn--delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
            <div
              className={`recipe__user-generated ${
                recipe.hasOwnProperty("key") ? "" : "hidden"
              }`}
            >
              <svg>
                <use href="icons.svg#icon-user"></use>
              </svg>
            </div>
            <button className="btn--round" onClick={handleBookmark}>
              <svg>
                <use
                  href={`icons.svg#icon-bookmark${bookmarked ? "-fill" : ""}`}
                ></use>
              </svg>
            </button>
          </div>

          <div className="recipe__ingredients">
            <h2 className="heading--2">Recipe ingredients</h2>
            <ul className="recipe__ingredient-list">
              {ingredients?.map((ingredient, i) => {
                const { quantity } = ingredient
                const finQuantity = quantity * (servingsCount / servings)
                const finQuantityFraction = new Fraction(finQuantity)

                return (
                  <li key={i} className="recipe__ingredient">
                    <svg className="recipe__icon">
                      <use href="icons.svg#icon-check"></use>
                    </svg>
                    <div className="recipe__quantity">
                      {finQuantityFraction.toFraction()}
                    </div>
                    <div className="recipe__description">
                      <span className="recipe__unit">{ingredient.unit}</span>{" "}
                      {ingredient.description}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="recipe__directions">
            <h2 className="heading--2">How to cook it</h2>
            <p className="recipe__directions-text">
              This recipe was carefully designed and tested by{" "}
              <span className="recipe__publisher">{publisher}</span>. Please
              check out directions at their website.
            </p>
            <a className="btn--small recipe__btn" href={source_url}>
              <span>Directions</span>
              <svg className="search__icon">
                <use href="icons.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </>
      )}
    </div>
  )
}
