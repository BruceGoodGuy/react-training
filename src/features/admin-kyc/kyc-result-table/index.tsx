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

interface KycResultTableProps {
  kycs: KycUser[];
}

const KycResultTable: React.FC<KycResultTableProps> = ({
  kycs = [],
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
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Final Status</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {kycs.length === 0 && (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell colSpan={4} className="text-center">
                No KYC submissions found.
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
              <TableCell>{format(kyc.created_at, "PPP")}</TableCell>
              <TableCell>{getStatusBadge(kyc.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default KycResultTable;
