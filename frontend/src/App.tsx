import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react";
import './App.css';

import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ProtectedRoute from "./components/route/ProtectedRoute";
import LoadingScreen from "./components/route/LoadingScreen";

import bg from './assets/images/bg.jpg';
import bgDark from './assets/images/bg-dark.jpg';

import { DesignContext } from "./context/DesignContext";
import Thema from "./components/Thema";
import useAuth from "./hooks/auth/useAuth";
import useAuthStore from "./stores/useAuthStore";
import useConversation from "./hooks/chat/useConversation";
import { ArrowLeftToLine } from 'lucide-react';


function App() {

  const design = useContext(DesignContext);
  
  const { loading } = useAuth();
  const currentUser = useAuthStore(state => state.currentUser);
  
  const { conversation, setConversation } = useConversation();

  if ( loading ) return <LoadingScreen bg={design?.thema ? bgDark : bg}/>

  return (
    <div className="h-screen w-screen flex justify-center items-center "
         style={{backgroundImage: `url(${design?.thema ? bgDark : bg})`}}>
      <Thema />
      {conversation && <div className='md:hidden fixed top-2 left-3 font-black '  
          style={{color: `${design?.colors.buttonColor}`}}
          onClick={() => setConversation(null)}> <ArrowLeftToLine /></div>}

      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route
            path="/login"
            element={currentUser ? <Navigate to="/" replace /> : <Login />} />

        <Route
          path="/signup"
          element={currentUser ? <Navigate to="/" replace /> : <SignUp />} />
      </Routes>
    </div>
  )
}

export default App