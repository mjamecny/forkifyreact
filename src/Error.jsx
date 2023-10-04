export default function Error({ msg }) {
  return (
    <div className="error">
      <div>
        <svg>
          <use href="icons.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>{msg}</p>
    </div>
  )
}
