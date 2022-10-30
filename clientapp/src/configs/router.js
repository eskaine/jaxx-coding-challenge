import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';

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
                path: '*',
                element: <Navigate replace to="/login" />,
            },
        ],
    },
]);
