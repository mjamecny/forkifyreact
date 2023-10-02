export default function SearchResultsItem() {
  return (
    <li className="preview">
      <a className="preview__link preview__link--active" href="#23456">
        <figure className="preview__fig">
          <img src="src/img/test-1.jpg" alt="Test" />
        </figure>
        <div className="preview__data">
          <h4 className="preview__title">Pasta with Tomato Cream ...</h4>
          <p className="preview__publisher">The Pioneer Woman</p>
          <div className="preview__user-generated">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
  )
}
