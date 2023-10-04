import { Outlet } from "react-router-dom"

import Header from "./Header"
import SearchResults from "./SearchResults"
import Modal from "./Modal"

export default function AppLayout() {
  return (
    <>
      <div className="container">
        <Header />
        <SearchResults />
        <Outlet />
      </div>
      <Modal />
    </>
  )
}
