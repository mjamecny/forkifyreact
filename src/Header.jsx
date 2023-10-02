import Navigation from "./Navigation"
import SearchForm from "./SearchForm"

export default function Header() {
  return (
    <header className="header">
      <img src="logo.png" alt="Logo" className="header__logo" />
      <SearchForm />
      <Navigation />
    </header>
  )
}
