import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react";
import { ArrowLeftToLine } from 'lucide-react';

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
import useConversationsStore from "./stores/useConversationsStore";
import useConversations from "./hooks/chat/useConversations";


function App() {

  const design = useContext(DesignContext);
  
  const { loading } = useAuth();
  const currentUser = useAuthStore(state => state.currentUser);
  
  const activeConversationId = useConversationsStore((state) => state.activeConversationId)
  const { setActiveConversation } = useConversations();

  if ( loading ) return <LoadingScreen bg={design?.thema ? bgDark : bg}/>

  return (
    <div className="h-screen w-screen flex justify-center items-center "
         style={{backgroundImage: `url(${design?.thema ? bgDark : bg})`}}>
      <Thema />
      {activeConversationId && <div className='md:hidden fixed top-2 left-3 font-black '  
          style={{color: `${design?.colors.buttonColor}`}}
          onClick={() => setActiveConversation('')}> <ArrowLeftToLine /></div>}

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