import { requireAuth } from "../shared/LoginRequire.ts";

import NotFound from "../404.tsx";
import type { RouteObject } from "react-router";
import Pages from './Pages.tsx';
import userRoutes from './User/UserRoutes.tsx';
import HomePage from './Home/HomePage.tsx';
import { Navigate } from 'react-router-dom';
import adminRoutes from './Admin/AdminRoute.tsx';
import productRoutes from './Products/ProductRoutes.tsx';

export async function pageLoader({request}: { request: Request }) {
    const res = await requireAuth(request);
    return res ? res : null;
}

const pageRoutes: RouteObject[] = [
    {
        path: 'pages',
        element: <Pages/>,
        loader: pageLoader,
        errorElement: <NotFound/>,
        children: [
            ...productRoutes,
            ...userRoutes,
            ...adminRoutes,
            { path: 'home', element: <HomePage /> },
            { path: '', element: <Navigate to="home" replace /> },
        ]
    }
]

export default pageRoutes;