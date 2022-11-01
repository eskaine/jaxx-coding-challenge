import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import AuthGuard from '../utils/authGuard';

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
                path: '*',
                element: <Navigate replace to="/login" />,
            },
        ],
    },
]);
