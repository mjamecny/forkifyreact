import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

import Header from "./Header"
import SearchResults from "./SearchResults"

import { setShowModal, uploadRecipe } from "./features/recipe/recipeSlice"

export default function AppLayout() {
  const showModal = useSelector((state) => state.recipe.showModal)
  const dispatch = useDispatch()

  const [title, setTitle] = useState("TEST23")
  const [sourceUrl, setSourceUrl] = useState("TEST23")
  const [image, setImage] = useState("TEST23")
  const [publisher, setPublisher] = useState("TEST23")
  const [cookingTime, setCookingTime] = useState("23")
  const [servings, setServings] = useState("23")
  const [ingredient, setIngredient] = useState("0.5,kg,Rice")
  const [ingredient2, setIngredient2] = useState("1,,Avocado")
  const [ingredient3, setIngredient3] = useState(",,salt")
  const [ingredient4, setIngredient4] = useState("")
  const [ingredient5, setIngredient5] = useState("")
  const [ingredient6, setIngredient6] = useState("")

  function handleModal() {
    dispatch(setShowModal(false))
  }

  function handleSubmit(e) {
    e.preventDefault()

    let finalArr = []
    const ingredientArr = [
      ingredient,
      ingredient2,
      ingredient3,
      ingredient4,
      ingredient5,
      ingredient6,
    ]

    function addIngredient(ingredient) {
      const ingArr = ingredient.split(",").map((ing) => ing.trim())
      const [quantity, unit, description] = ingArr
      finalArr.push({ quantity, unit, description })
    }

    ingredientArr.forEach((ingredient) => {
      if (!ingredient) {
        return
      } else {
        addIngredient(ingredient)
      }
    })

    const recipe = {
      title,
      source_url: sourceUrl,
      image_url: image,
      publisher,
      cooking_time: +cookingTime,
      servings: +servings,
      ingredients: finalArr,
    }

    dispatch(uploadRecipe(recipe))
    handleModal()
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
        <form className="upload" onSubmit={handleSubmit}>
          <div className="upload__column">
            <h3 className="upload__heading">Recipe data</h3>
            <label>Title</label>
            <input
              value={title}
              required
              name="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>URL</label>
            <input
              value={sourceUrl}
              required
              name="sourceUrl"
              type="text"
              onChange={(e) => setSourceUrl(e.target.value)}
            />
            <label>Image URL</label>
            <input
              value={image}
              required
              name="image"
              type="text"
              onChange={(e) => setImage(e.target.value)}
            />
            <label>Publisher</label>
            <input
              value={publisher}
              required
              name="publisher"
              type="text"
              onChange={(e) => setPublisher(e.target.value)}
            />
            <label>Prep time</label>
            <input
              value={cookingTime}
              required
              name="cookingTime"
              type="number"
              onChange={(e) => setCookingTime(e.target.value)}
            />
            <label>Servings</label>
            <input
              value={servings}
              required
              name="servings"
              type="number"
              onChange={(e) => setServings(e.target.value)}
            />
          </div>

          <div className="upload__column">
            <h3 className="upload__heading">Ingredients</h3>
            <label>Ingredient 1</label>
            <input
              value={ingredient}
              type="text"
              required
              name="ingredient-1"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={(e) => setIngredient(e.target.value)}
            />
            <label>Ingredient 2</label>
            <input
              value={ingredient2}
              type="text"
              name="ingredient-2"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={(e) => setIngredient2(e.target.value)}
            />
            <label>Ingredient 3</label>
            <input
              value={ingredient3}
              type="text"
              name="ingredient-3"
              placeholder="Format: 'Quantity,Unit,Description'"
              onChange={(e) => setIngredient3(e.target.value)}
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
