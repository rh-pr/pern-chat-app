import { Routes, Route } from "react-router-dom"
import { useState } from "react";
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import bg from './assets/images/bg.jpg';
import bgDark from './assets/images/bg-dark.jpg';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  return (
    <div className="h-screen w-screen flex justify-center items-center "
         style={{backgroundImage: `url(${isDarkTheme ? bgDark : bg})`}}>
      <Routes>
          <Route path='/'  element={<Home  />} />
          <Route path='/login' element={<Login thema={isDarkTheme}/>} />
          <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
