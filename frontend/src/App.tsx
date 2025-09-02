import { Routes, Route, Navigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
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
import useAuthStore from "./stores/useAuthStore";
import useConversationsStore from "./stores/useConversationsStore";
import useConversations from "./hooks/chat/useConversations";
import { getCurrentUser } from "./servieces/authService";
import ForgetPassword from "./pages/ForgetPassword";
import Confirmation from "./pages/Confirmation";
import ChangePassword from "./pages/ChangePassword";
import useSocketStore from "./stores/useSocketSore";


function App() {

  const design = useContext(DesignContext);
  
  // const { loading } = useAuth();
  const currentUser = useAuthStore(state => state.currentUser);
  const setCurrentUser = useAuthStore(state => state.setCurrentUser);
  
  const activeConversationId = useConversationsStore((state) => state.activeConversationId)
  const { setActiveConversation } = useConversations();

  const [loading, setLoading] = useState(false)

  const setExpireAt = useAuthStore(state => state.setExpireAt);
  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
      const savedExpireAt = localStorage.getItem('expireAt');
      if (savedExpireAt) {
          setExpireAt(new Date(savedExpireAt));
      }
  }, [setExpireAt]); 

  useEffect(() => {

    if (currentUser) {
      connect(currentUser.id);
      return () => disconnect();
      
    }
  },[currentUser, connect, disconnect])

  useEffect(() => {
    (async () => {
      setLoading(true);
      const user = await getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
      setLoading(false);
    })();
  },[]);


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