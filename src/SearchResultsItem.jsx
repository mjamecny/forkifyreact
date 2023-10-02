import { Link, useParams } from "react-router-dom"

export default function SearchResultsItem({ recipe }) {
  const { id, title, publisher, image_url } = recipe
  const { id: recipeId } = useParams()
  return (
    <li className="preview">
      <Link
        className={`preview__link ${
          id === recipeId ? "preview__link--active" : ""
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
              recipe.hasOwnProperty("key") ? "" : "hidden"
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
}
