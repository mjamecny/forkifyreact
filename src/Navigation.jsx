import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { getBookmarks, getRecipe } from "./features/recipe/recipeSlice"

export default function Navigation() {
  const bookmarks = useSelector(getBookmarks)
  const recipe = useSelector(getRecipe)

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <button className="nav__btn nav__btn--add-recipe">
            <svg className="nav__icon">
              <use href="icons.svg#icon-edit"></use>
            </svg>
            <span>Add recipe</span>
          </button>
        </li>
        <li className="nav__item">
          <button className="nav__btn nav__btn--bookmarks">
            <svg className="nav__icon">
              <use href="icons.svg#icon-bookmark"></use>
            </svg>
            <span>Bookmarks</span>
          </button>
          <div className="bookmarks">
            <ul className="bookmarks__list">
              {bookmarks.length === 0 ? (
                <div className="message">
                  <div>
                    <svg>
                      <use href="icons.svg#icon-smile"></use>
                    </svg>
                  </div>
                  <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
                </div>
              ) : (
                bookmarks.map((bookmark) => {
                  const { id, publisher, title, image_url } = bookmark
                  return (
                    <li key={id} className="preview">
                      <Link
                        className={`preview__link ${
                          id === recipe.id ? "preview__link--active" : ""
                        }`}
                        to={`/${id}`}
                      >
                        <figure className="preview__fig">
                          <img src={image_url} alt={title} />
                        </figure>
                        <div className="preview__data">
                          <h4 className="preview__title">{title}</h4>
                          <p className="preview__publisher">{publisher}</p>
                          <div
                            className={`preview__user-generated ${
                              bookmark.hasOwnProperty("key") ? "" : "hidden"
                            }`}
                          >
                            <svg>
                              <use href="icons.svg#icon-user"></use>
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })
              )}
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  )
}
