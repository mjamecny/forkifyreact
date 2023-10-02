import "./scss/main.scss"

import SearchForm from "./SearchForm"
import Navigation from "./Navigation"
import SearchResults from "./SearchResults"
import Recipe from "./Recipe"

export default function App() {

  return (
    <div className="container">
      <header className="header">
        <img src="logo.png" alt="Logo" className="header__logo" />
        <SearchForm />
        <Navigation />
      </header>
      <SearchResults />
      <Recipe />
    </div>
  )
}
