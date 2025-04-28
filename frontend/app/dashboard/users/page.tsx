// import { DataTableDemo } from "../components/DataTableDemo";

// export default function Users() {
//   return (
//     <div className="max-md:pt-20 p-4 min-h-screen bg-white md:rounded-xl">
//       <DataTableDemo />
//     </div>
//   );
// }
"use client";

import { DataTable } from "../components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { CampaignType } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import DataTableSkeleton from "@/app/components/skeletons/DataTableSkeleton";

export default function Users() {
  const { fetchedData, users } = useSelector((state: RootState) => state.dashboard);

  const userColumns: ColumnDef<CampaignType>[] = [
    { accessorKey: "username", header: "Username" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "email", header: "Email" },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="pointer">Edit</DropdownMenuItem>
              <DropdownMenuItem
              // onClick={(e) => {
              //   e.stopPropagation();
              //   handleDelete(row.original._id);
              // }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="max-md:pt-20 p-4 min-h-screen bg-white md:rounded-xl">
      {fetchedData ? (
        <DataTable data={users} columns={userColumns} filterPlaceholder="Search users..." />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
}
