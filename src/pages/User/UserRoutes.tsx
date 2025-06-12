import { Navigate, type RouteObject } from "react-router-dom";
import UserPage from "./UserPage.tsx";
import UserKYCPage from "./UserKYCPage.tsx";
import UserProfilePage from "./UserProfilePage.tsx";
import { pageLoader } from "../../pages/Admin/AdminRoute.tsx";

const userRoutes: RouteObject[] = [
  {
    path: "users",
    element: <UserPage />,
    children: [
      { path: "", element: <Navigate to="list" replace /> },
      { path: "profile", element: <UserProfilePage /> },
      {
        path: "kyc",
        element: <UserKYCPage />,
      },
      {
        path: ":id/kyc",
        loader: pageLoader,
        element: <UserKYCPage />,
      },
      {
        path: ":id/details",
        element: <UserProfilePage />,
        loader: pageLoader,
      },
    ],
  },
];

export default userRoutes;
