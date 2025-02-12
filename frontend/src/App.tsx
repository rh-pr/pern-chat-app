import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react";
import './App.css';
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import bg from './assets/images/bg.jpg';
import bgDark from './assets/images/bg-dark.jpg';

import { Colors } from "./types/main";
import { getThemaColors } from "./utils/design";

function App() {

  const [isDarkTheme, setIsDarkTheme] = useState(false);
   const [colors, setColors] = useState<Colors>(getThemaColors(isDarkTheme));
      
    useEffect(() => {
      setColors(getThemaColors(isDarkTheme));
      document.documentElement.className = isDarkTheme ? "dark" : "light";
    },[isDarkTheme])

  return (
    <div className="h-screen w-screen flex justify-center items-center "
         style={{backgroundImage: `url(${isDarkTheme ? bgDark : bg})`}}>
      <Routes>
          <Route path='/'  element={<Home  />} />
          <Route path='/login' element={<Login thema={isDarkTheme} colors={colors}/>} />
          <Route path='/signup' element={<SignUp thema={isDarkTheme} colors={colors}/>} />
      </Routes>
    </div>
  )
}

export default App
