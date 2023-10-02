import { BrowserRouter, Route, Routes } from "react-router-dom"

import "./scss/main.scss"

import Recipe from "./Recipe"
import AppLayout from "./AppLayout"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/:id" element={<Recipe />} />
        </Route>
        <Route path="/" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  )
}
