import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/index.tsx";
import KycTable from "../../features/admin-kyc/kyc-table/index.tsx";
import { useNavigate } from "react-router-dom";

interface KycPreviewProps {
  // Add any props here
}

const KycPreview: React.FC<KycPreviewProps> = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [kycs, setkycs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKycs = async () => {
      try {
        setIsLoading(true);
        // Replace this URL with your actual API endpoint
        const response = await fetch(`${import.meta.env.VITE_API_URL}s/kycs`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch KYC submissions");
        }

        const data = await response.json();
        setkycs(data.data || []);
      } catch (error) {
        console.error("Error fetching KYC data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKycs();
  }, []);

  const approveKyc = async (id: string, status: boolean) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}s/kycs/${id}/approve`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve KYC");
      }

      // Refresh the KYC list after approval
      const updatedResponse = await fetch(
        `${import.meta.env.VITE_API_URL}s/kycs`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (updatedResponse.ok) {
        const data = await updatedResponse.json();
        setkycs(data.data || []);
      }
    } catch (error) {
      console.error("Error approving KYC:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <Breadcrumb items={[{ label: "Kyc list" }]} />
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              KYC Submission
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow m-3">
              <KycTable
                kycs={kycs ?? []}
                onApprove={approveKyc}
                onView={(userid) => {
                  navigate(`/pages/users/${userid}/kyc`);
                }}
                onReject={approveKyc}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycPreview;
