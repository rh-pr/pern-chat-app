import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

function App() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#E8ECD7]">
      <Routes>
          <Route path='/'  element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
