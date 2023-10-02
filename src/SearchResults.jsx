import SearchResultsItem from "./SearchResultsItem"

export default function SearchResults() {
  return (
    <div className="search-results">
      <ul className="results">
        <SearchResultsItem />
      </ul>
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
