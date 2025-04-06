"use client";

import { BaggageClaim, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { DataTable } from "../components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { CampaignType } from "@/lib/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/state/store";
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
import { publicRequest } from "@/lib/api";
import { updateCampaignData } from "@/app/state/mainSlice";
import { deleteFileFromFirebase } from "@/lib/firebase";
import { useEffect, useState } from "react";

const DATA = [
  {
    name: "Total Campaigns",
    amount: 0,
    color: "#bfb6e6",
    icon: <BaggageClaim className="w-6 h-6" />,
  },
  {
    name: "Ongoing Campaigns",
    amount: 0,
    color: "#b6e6c6",
    icon: <BaggageClaim className="w-6 h-6" />,
  },
];

export default function Campaign() {
  const [campaignStat, setCampaignStat] = useState(DATA);
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const hasFetched = useSelector((state: RootState) => state.main.hasFetchedGeneralData);
  const campaignData = useSelector(
    (state: RootState) => state.main.fetchedGeneralDataObj.campaignData
  ) as CampaignType[];

  useEffect(() => {
    const activeCampaign = campaignData.reduce(
      (acc, c) => acc + (c.status === "ongoing" ? 1 : 0),
      0
    );
    const stat = campaignStat.map((cs, i) => {
      return { ...cs, amount: i === 0 ? campaignData.length : activeCampaign };
    });
    setCampaignStat(stat);
  }, [hasFetched]);

  const handleDelete = async (id: number) => {
    const campaign = campaignData.find((campaign) => campaign._id === id);
    if (campaign) {
      try {
        const res = await publicRequest.delete(`/campaign/${id}`);
        if (res.status === 200) {
          //Delete Images from firebase
          for (const imgUrl of campaign.campaignImages) {
            await deleteFileFromFirebase(imgUrl);
          }

          //remove delted campignData
          const filteredCampaignData = campaignData.filter((campaign) => campaign._id !== id);
          //update store
          dispatch(updateCampaignData(filteredCampaignData));
          toast({
            title: "Delete Successful",
            description: "Your Campaign was deleted successfully!",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: `${error}`,
        });
        console.error("Error deleting Images:", error);
      }
    }
  };

  const campaignColumns: ColumnDef<CampaignType>[] = [
    { accessorKey: "status", header: "Status" },
    { accessorKey: "name", header: "Campaign Name" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "date", header: "Date" },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
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
              <DropdownMenuSeparator />
              <DropdownMenuItem className="pointer">Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(row.original._id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="max-md:pt-20 w-full p-4 flex flex-col gap-2 lg:gap-4 min-h-screen bg-white md:rounded-xl">
      <div className="w-full flex flex-col xs:flex-row gap-2 lg:gap-4 xs:justify-between">
        {hasFetched
          ? campaignStat.map((item, index) => (
              <div
                className="relative p-4 w-full h-20 md:h-32 rounded-xl"
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
            ))
          : // Skeleton Loader
            Array.from({ length: DATA.length }).map((_, index) => (
              <div
                className="animate-pulse bg-gray-200 w-full h-20 md:h-32 rounded-xl"
                key={index}
              />
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

{
  /* <div className="space-y-4 animate-pulse">
<div className="h-10 w-full bg-gray-200 rounded-lg"></div>
<div className="h-10 w-full bg-gray-200 rounded-lg"></div>
<div className="h-10 w-full bg-gray-200 rounded-lg"></div>
<div className="h-10 w-full bg-gray-200 rounded-lg"></div>
</div> */
}
