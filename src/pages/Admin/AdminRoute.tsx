import type { RouteObject } from "react-router";
import AdminPage from "./AdminPage.tsx";
import { requireStaff } from "../../shared/StaffRequire.ts";
import AdminKycPreview from "../Admin/AdminKycPreview.tsx";
import AdminKycResult from "../Admin/AdminKycResult.tsx";

export async function pageLoader({ request }: { request: Request }) {
  const res = await requireStaff(request);
  return res ? res : null;
}

const adminRoutes: RouteObject[] = [
  {
    loader: pageLoader,
    path: "admin",
    element: <AdminPage />,
    children: [
      { path: "preview", element: <AdminKycPreview /> },
      { path: "result", element: <AdminKycResult /> },
    ],
  },
];

export default adminRoutes;
