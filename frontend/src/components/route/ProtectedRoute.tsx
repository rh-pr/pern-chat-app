import { JSX } from "react"
import useAuthStore from "../../stores/useAuthStore"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}: {children: JSX.Element }) => {
  const currentUser = useAuthStore(state => state.currentUser);

  if (!currentUser) {
    return <Navigate to={'/login'} replace />
  }
  return children;
}

export default ProtectedRoute
