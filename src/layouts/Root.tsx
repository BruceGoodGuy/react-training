import { Outlet } from "react-router";
import AppHeader from "../components/Header/AppHeader.tsx";
import AppFooter from "../components/Footer/AppFooter.tsx";

const RootLayout: React.FC = () => {
  return (
    <>
      <AppHeader />
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* <AppSidebar/> */}
        <div
          id="main-content"
          className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900 ml-0"
        >
          <main>
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">
                <Outlet />
              </div>
            </div>
            <AppFooter />
          </main>
        </div>
      </div>
    </>
  );
};

export default RootLayout;
