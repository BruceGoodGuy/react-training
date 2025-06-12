import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch.tsx";
import React from "react";
import { useStore } from "../../shared";
import Breadcrumb from "../../components/Breadcrumb/index.tsx";
import { UserTable } from "../../features/user-list/components/user-table/index.tsx";

const HomePage = () => {
  const userData = useStore((state) => state.userData);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Check if the user is authorized before fetching data
    if (!userData.isofficer) {
      return;
    }

    // You could add additional initialization logic here
    // This effect will run once when the component mounts
    // Fetch the list of users
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}u/list`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Call the function to fetch users
    fetchUsers();

    // If you need to perform cleanup when component unmounts
    return () => {
    };
  }, []);

  return (
    <React.Fragment>
      {userData.isofficer ? (
        <>
          <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full mb-1">
              <div className="mb-4">
                <Breadcrumb items={[{ label: "Users" }]} />
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  All users
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow m-3">
                  <UserTable users={users ?? []} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-white mt-10">
          Hello Guest!
        </p>
      )}
    </React.Fragment>
  );
};

export default HomePage;
