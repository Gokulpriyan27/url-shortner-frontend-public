import {BrowserRouter, Routes, Route} from "react-router-dom"
import UrlPage from "./components/UrlPage/UrlPage"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Dashboard from "./components/Dashboard/Dashboard"
import Navigation from "./components/Navigation/Navigation"
import ListAllUrl from "./components/ListAllUrl/ListAllUrl"

function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/short-url/:userid" element={<UrlPage />} />
      <Route path="/dashboard/:userid" element={<Dashboard />} />
      <Route path="/listall/:userid" element={<ListAllUrl />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
