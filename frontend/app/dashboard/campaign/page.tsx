"use client";

import { BaggageClaim, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { DataTable } from "../components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { CampaignType } from "@/lib/types";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import DataTableSkeleton from "@/app/components/skeletons/DataTableSkeleton";

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

export default function Campaign() {
  const hasFetched = useSelector((state: RootState) => state.main.hasFetchedGeneralData);
  const campaignData = useSelector(
    (state: RootState) => state.main.fetchedGeneralDataObj.campaignData
  ) as CampaignType[];

  const campaignColumns: ColumnDef<CampaignType>[] = [
    { accessorKey: "status", header: "Status" },
    { accessorKey: "name", header: "Campaign Name" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "date", header: "Date" },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        //const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment._id)}>
                Copy payment ID
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="pointer">Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const DATA = [
    {
      name: "Total Campaigns",
      amount: 6,
      color: "#bfb6e6",
      icon: <BaggageClaim className="w-6 h-6" />,
    },
    {
      name: "Total Donations",
      amount: "N100,000,000",
      color: "#636ba9",
      icon: <BaggageClaim className="w-6 h-6" />,
    },
    {
      name: "Active Campaigns",
      amount: "3",
      color: "#b6e6c6",
      icon: <BaggageClaim className="w-6 h-6" />,
    },
  ];

  return (
    <div className="max-md:pt-20 w-full p-4 flex flex-col gap-2 lg:gap-4 min-h-screen bg-white md:rounded-xl">
      <div className="w-full flex flex-col xs:flex-row gap-2 lg:gap-4 xs:justify-between">
        {DATA.map((item, index) => (
          <div
            className={`relative p-4 w-full h-20 md:h-32 rounded-xl`}
            style={{ background: item.color }}
            key={index}
          >
            <div className="absolute p-4 top-0 left-0 flex gap-2">
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <div className="h-full flex flex-col justify-center">
              <span className="w-full inline-block text-center">{item.amount}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Create Campaign Btn */}
      <Link href="/dashboard/campaign/create">
        <button className="w-full p-4 rounded-xl bg-green-500">Create</button>
      </Link>

      {hasFetched ? (
        <DataTable
          data={campaignData}
          columns={campaignColumns}
          filterPlaceholder="Search campaigns..."
        />
      ) : (
        <DataTableSkeleton />
      )}
    </div>
  );
}
