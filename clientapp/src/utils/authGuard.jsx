import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated } from '../reducers/adminSlice';

function AuthGuard({ children }) {
  const isAuth = useSelector(isAuthenticated);

  if(!isAuth) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
