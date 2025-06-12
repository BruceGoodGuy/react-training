import React from "react";
import { Link } from "react-router-dom";
import Status from "../../user-kyc/components/status/index.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { format } from "date-fns";

interface KycUser {
  id: string;
  name: string;
  status: "pending" | "approved" | "rejected";
  date: Date;
}

interface KycTableProps {
  kycs: KycUser[];
  onView?: (userId: string) => void;
  onApprove?: (id: string, status: boolean) => void;
  onReject?: (id: string, status: boolean) => void;
}

const KycTable: React.FC<KycTableProps> = ({
  kycs = [],
  onView,
  onApprove,
  onReject,
}) => {
  const getStatusBadge = (status: string) => {
    return <Status status={status} showStatus={false} />;
  };

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {kycs.length === 0 && (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell colSpan={4} className="text-center">
                No KYC result found.
              </TableCell>
            </TableRow>
          )}
          {kycs.map((kyc) => (
            <TableRow
              key={kyc.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Link
                  to={`/pages/users/${kyc.userId}/details`}
                  className="hover:underline"
                >
                  {kyc.firstname} {kyc.middlename} {kyc.lastname}
                </Link>
              </TableCell>
              <TableCell>{getStatusBadge(kyc.status)}</TableCell>
              <TableCell>{format(kyc.created_at, "PPP")}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onView && onView(kyc.userId)}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    View
                  </button>
                  {kyc.status === "1" && (
                    <>
                      <button
                        onClick={() => onApprove && onApprove(kyc.id, true)}
                        className="font-medium text-green-600 hover:underline dark:text-green-500"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onReject && onReject(kyc.id, false)}
                        className="font-medium text-red-600 hover:underline dark:text-red-500"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default KycTable;
