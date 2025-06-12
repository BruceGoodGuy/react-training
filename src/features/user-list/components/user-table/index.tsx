import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Link } from "react-router-dom";

interface User {
  id: string | number;
  firstname: string;
  lastname: string;
  middlename: string;
  gender: string;
  email: string;
  role: string;
}

interface UserTableProps {
  users: User[];
}

export function UserTable({ users }: UserTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Gender</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Link
                  to={`/pages/users/${user.id}/details`}
                  className="hover:underline"
                >
                  {user.firstname} {user.middlename} {user.lastname}
                </Link>
              </TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role ? "Officer" : "Guest"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
