import { Outlet } from "react-router-dom"
import Header from "./Header"
import SearchResults from "./SearchResults"

export default function AppLayout() {
  return (
    <div className="container">
      <Header />
      <SearchResults />
      <Outlet />
    </div>
  )
}
