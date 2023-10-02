import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Header from "./Header"
import SearchResults from "./SearchResults"

import { setShowModal } from "./features/recipe/recipeSlice"

export default function AppLayout() {
  const showModal = useSelector((state) => state.recipe.showModal)
  const dispatch = useDispatch()

  function handleModal() {
    dispatch(setShowModal(false))
  }

  return (
    <>
      <div className="container">
        <Header />
        <SearchResults />
        <Outlet />
      </div>
      <div className={`overlay ${showModal ? "" : "hidden"}`}></div>
      <div className={`add-recipe-window ${showModal ? "" : "hidden"}`}>
        <button className="btn--close-modal" onClick={handleModal}>
          &times;
        </button>
        <form className="upload">
          <div className="upload__column">
            <h3 className="upload__heading">Recipe data</h3>
            <label>Title</label>
            <input value="TEST23" required name="title" type="text" />
            <label>URL</label>
            <input value="TEST23" required name="sourceUrl" type="text" />
            <label>Image URL</label>
            <input value="TEST23" required name="image" type="text" />
            <label>Publisher</label>
            <input value="TEST23" required name="publisher" type="text" />
            <label>Prep time</label>
            <input value="23" required name="cookingTime" type="number" />
            <label>Servings</label>
            <input value="23" required name="servings" type="number" />
          </div>

          <div className="upload__column">
            <h3 className="upload__heading">Ingredients</h3>
            <label>Ingredient 1</label>
            <input
              value="0.5,kg,Rice"
              type="text"
              required
              name="ingredient-1"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 2</label>
            <input
              value="1,,Avocado"
              type="text"
              name="ingredient-2"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 3</label>
            <input
              value=",,salt"
              type="text"
              name="ingredient-3"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 4</label>
            <input
              type="text"
              name="ingredient-4"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 5</label>
            <input
              type="text"
              name="ingredient-5"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 6</label>
            <input
              type="text"
              name="ingredient-6"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
          </div>

          <button className="btn upload__btn">
            <svg>
              <use href="icons.svg#icon-upload-cloud"></use>
            </svg>
            <span>Upload</span>
          </button>
        </form>
      </div>
    </>
  )
}
