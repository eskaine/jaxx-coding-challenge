import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from '../reducers/admin/adminSlice';

function AuthGuard({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if(!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
