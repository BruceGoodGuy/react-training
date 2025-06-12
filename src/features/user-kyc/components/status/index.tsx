import React from "react";
import { Badge, Tooltip, Card } from "flowbite-react";
import { CiClock1, CiCircleCheck } from "react-icons/ci";
import { RiEditCircleLine } from "react-icons/ri";
import { HiOutlineExclamationCircle } from "react-icons/hi";

// import './status.css';

export type KYCStatus = "0" | "1" | "2" | "3";

interface StatusProps {
  status: KYCStatus;
  className?: string;
  showLabel?: boolean;
  showStatus?: boolean;
}

const Status: React.FC<StatusProps> = ({
  status,
  className = "",
  showLabel = true,
  showStatus = true,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case "0":
        return {
          color: "success",
          icon: () => <CiCircleCheck size={16} />,
          text: "Approved",
          description: "KYC verification has been approved",
        };
      case "1":
        return {
          color: "info",
          icon: () => <CiClock1 size={16} />,
          text: "Pending",
          description: "KYC verification is being processed",
        };
      case "2":
        return {
          color: "failure",
          icon: () => <HiOutlineExclamationCircle size={16} />,
          text: "Rejected",
          description: "KYC verification has been rejected",
        };
      case "3":
      default:
        return {
          color: "warning",
          icon: () => <RiEditCircleLine size={16} />,
          text: "Not Submitted",
          description: "KYC verification has not been submitted yet",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Tooltip content={config.description}>
      <div className={`kyc-status ${className} flex items-center w-full my-3`}>
        {showStatus && (
          <h5 className="text-black dark:text-white mr-2">Status:</h5>
        )}
        <Badge color={config.color as any} icon={config.icon}>
          {showLabel ? config.text : ""}
        </Badge>
      </div>
    </Tooltip>
  );
};

export default Status;
