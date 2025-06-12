import { useStore } from "../../shared";
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const userData = useStore((state) => state.userData);
  const navigate = useNavigate();

  return (
    <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                id="toggleSidebarMobileHamburger"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                id="toggleSidebarMobileClose"
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <a href="/" className="flex ml-2 md:mr-24">
              <img src="/logo.png" className="h-8 mr-3" alt="FlowBite Logo" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Simple KYC
              </span>
            </a>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center">
              <div className="hidden mr-3 -mb-1 sm:block">
                <span></span>
              </div>

              <button
                id="toggleSidebarMobileSearch"
                type="button"
                className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Search</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              <div className="flex items-center ml-3">
                <Dropdown
                  label={
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user"
                    />
                  }
                  inline
                  arrowIcon={false}
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {userData.firstname} {userData.lastname} (
                      {userData.isofficer ? "Officer" : "User"})
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {userData.email}
                    </p>
                  </div>
                  {!userData.isofficer && (
                    <>
                      <DropdownDivider />{" "}
                      <DropdownItem
                        as="a"
                        onClick={() => navigate("/pages/users/profile")}
                      >
                        User Profile
                      </DropdownItem>
                      <DropdownItem
                        as="a"
                        onClick={() => navigate("/pages/users/kyc")}
                      >
                        KYC
                      </DropdownItem>
                    </>
                  )}
                  <DropdownDivider />
                  {userData.isofficer ? (
                    <>
                      <DropdownItem
                        as="a"
                        onClick={() => navigate("/pages/admin/preview")}
                      >
                        Preview
                      </DropdownItem>
                      <DropdownItem
                        as="a"
                        onClick={() => navigate("/pages/admin/result")}
                      >
                        Result
                      </DropdownItem>
                      <DropdownDivider />
                    </>
                  ) : null}
                  <DropdownItem
                    as="a"
                    onClick={() => {
                      // Clear authentication state
                      useStore
                        .getState()
                        .logout()
                        .then(() => {
                          navigate("/auth/login");
                        });
                    }}
                  >
                    Sign out
                  </DropdownItem>
                </Dropdown>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default AppHeader;
