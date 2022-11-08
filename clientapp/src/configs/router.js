import { Route, Routes, Navigate } from "react-router-dom"
import AuthGuard from '../utils/authGuard';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import AddProduct from '../pages/AddProduct/AddProduct';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
      <Route path="/add-product" element={<AuthGuard><AddProduct /></AuthGuard>} />
      <Route path="/*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;
