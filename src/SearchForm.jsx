export default function SearchForm() {
  return (
    <form className="search">
      <input
        type="text"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
      />
      <button className="btn search__btn">
        <svg className="search__icon">
          <use href="icons.svg#icon-search"></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  )
}
