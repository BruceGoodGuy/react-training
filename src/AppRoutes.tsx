import { Navigate } from "react-router-dom";
import { requireAuth } from "./shared/LoginRequire.ts";
import pageRoutes from './pages/PagesRoutes.tsx';
import authRoutes from './auth/AuthRoutes.tsx';
import type { RouteObject } from "react-router";
import NotFound from './404.tsx';

export async function pageLoader({request}: { request: Request }) {
    await requireAuth(request);
    const data = await fetch("/api/dashboard").then(res => res.json());
    return data;
}

const appRoutes: RouteObject[] = [
    ...authRoutes,
    ...pageRoutes,
    {
        path: '/',
        element: <Navigate to="/pages" replace />
    },
    {
        path: '*',
        element: <NotFound />
    }
];

export default appRoutes;