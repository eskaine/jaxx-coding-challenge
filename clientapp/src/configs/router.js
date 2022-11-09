import { Route, Routes, Navigate } from "react-router-dom"
import AuthGuard from '../utils/authGuard';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Product from '../pages/Product/Product';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login pageLabel="Login" />} />
      <Route path="/register" element={<Login pageLabel="Register" />} />
      <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
      <Route path="/add-product" element={<AuthGuard><Product pageLabel="Add Product" /></AuthGuard>} />
      <Route path="/edit-product" element={<AuthGuard><Product pageLabel="Edit Product" /></AuthGuard>} />
      <Route path="/*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;
