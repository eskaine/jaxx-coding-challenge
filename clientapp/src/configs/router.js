import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthGuard from '../utils/authGuard';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AddProduct from '../pages/AddProduct';

export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: '/',
                element: <Navigate replace to="/login" />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'dashboard',
                element: <AuthGuard><Dashboard /></AuthGuard>,
            },
            {
                path: 'add-product',
                element: <AuthGuard><AddProduct /></AuthGuard>,
            },
            {
                path: '*',
                element: <Navigate replace to="/login" />,
            },
        ],
    },
]);
