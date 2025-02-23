import { Routes, Route } from "react-router-dom"
import { useContext } from "react";
import './App.css';
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

import bg from './assets/images/bg.jpg';
import bgDark from './assets/images/bg-dark.jpg';

import { DesignContext } from "./context/DesignContext";
import Thema from "./components/Thema";

function App() {

  const design = useContext(DesignContext);;
    console.log(design?.thema)
      
    // useEffect(() => {
    //   setColors(getThemaColors(isDarkTheme));
    //   document.documentElement.className = isDarkTheme ? "dark" : "light";
    // },[isDarkTheme])

  return (
    <div className="h-screen w-screen flex justify-center items-center "
         style={{backgroundImage: `url(${design?.thema ? bgDark : bg})`}}>
      <Thema />
      <Routes>
          <Route path='/'  element={<Home  />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App