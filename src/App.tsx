import { Route, Routes } from "react-router-dom"
import BuilderPage from "./pages/BuilderPage"
import FormPage from "./pages/FormPage"
import Home from "./pages/Home"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form/:id" element={<FormPage />} />
        <Route path="/builder/:id" element={<BuilderPage />} />
      </Routes>
    </div>
  )
}
