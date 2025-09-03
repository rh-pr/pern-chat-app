import { Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react";
import { ArrowLeftToLine } from 'lucide-react';

import './App.css';

import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ProtectedRoute from "./components/route/ProtectedRoute";

import bg from './assets/images/bg.jpg';
import bgDark from './assets/images/bg-dark.jpg';

import { DesignContext } from "./context/DesignContext";
import Thema from "./components/Thema";
import useConversationsStore from "./stores/useConversationsStore";
import useConversations from "./hooks/chat/useConversations";
import ForgetPassword from "./pages/ForgetPassword";
import Confirmation from "./pages/Confirmation";
import ChangePassword from "./pages/ChangePassword";
import useAppInit from "./hooks/useAppInit";
import useAuthStore from "./stores/useAuthStore";
import LoadingScreen from "./components/route/LoadingScreen";

function App() {

  const design = useContext(DesignContext);
  
  const currentUser = useAuthStore(state => state.currentUser);
  const activeConversationId = useConversationsStore((state) => state.activeConversationId)
  const { setActiveConversation } = useConversations();

   const {loading} = useAppInit();

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

        <Route
          path="/forget"
          element={currentUser ? <Navigate to="/" replace /> : <ForgetPassword />} />

        <Route 
          path="/confirmation"
          element={currentUser ? <Navigate to="/" replace /> : <Confirmation /> } /> 

         <Route 
          path="/changePassword"
          element={currentUser ? <Navigate to="/" replace /> : <ChangePassword /> } /> 
      </Routes>
    </div>
  )
}

export default App