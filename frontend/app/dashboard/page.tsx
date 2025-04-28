"use client";

import Image from "next/image";
import { LineChartMultiple } from "./components/LineChartMultiple";
import Link from "next/link";
import { Banknote, MoreVertical } from "lucide-react";
import { useEffect } from "react";
import { publicRequest } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { setDashboardData, setFetchedData } from "../state/dashboardSlice";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { getTimeOfDayGreeting } from "@/lib/utils";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  // // If the user is loading or not authenticated, redirect them to the sign-in page
  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (!session) {
  //   // Redirect to sign-in page with callbackUrl to return after successful login
  //   router.push(`/api/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`);
  //   return null;
  // }
  // useEffect(() => {
  //   if (status === "loading") {
  //     return; // Wait for session to load
  //   }

  //   if (!session) {
  //     // Redirect to sign-in page with callbackUrl (original page)
  //     router.push(`/api/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`);
  //   } else if (session?.user?.role !== "admin") {
  //     // If the user is not an admin, redirect to an "Access Denied" page
  //     router.push("/access-denied");
  //   }
  // }, [session, status, pathname, router]);

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="max-md:pt-20 w-full min-h-screen bg-white rounded-xl p-4 flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-[70%]  flex flex-col gap-4">
        {/* <span className="inline-block text-2xl font-bold p-4">Good morning, James.</span> */}
        <div className="w-full h-52 p-4 rounded-xl bg-gradient-to-b from-[#F2F2FC] to-[#ACAAFE]">
          {`${getTimeOfDayGreeting()},${
            session.user.username.charAt(0).toUpperCase() + session.user.username.slice(1)
          }`}
        </div>
        <div className="w-full flex flex-col md:flex-row gap-2">
          {[
            {
              icon: <Banknote className="w-6 h-6" />,
              amount: "$50,0000",
              about: "your bank balance",
            },
            {
              icon: <Banknote className="w-6 h-6" />,
              amount: "$50,0000",
              about: "your bank balance",
            },
            {
              icon: <Banknote className="w-6 h-6" />,
              amount: "$50,0000",
              about: "your bank balance",
            },
          ].map((item, index) => (
            <div
              className="p-4 flex-1 flex flex-col justify-between rounded-xl h-36 shadow-[rgba(117,_115,_199,_0.2)_0px_0px_16px]"
              key={index}
            >
              {/*Box Icons */}
              <div className="flex justify-between">
                {item.icon}
                <MoreVertical className="h-5 w-5" />
                {/* <LayoutDashboardIcon /> */}
                {/* <Users /> */}
              </div>
              <span className="text-xl font-medium">{item.amount}</span>
              <span className="text-sm">{item.about}</span>
            </div>
          ))}
        </div>
        {/* Chart */}
        <LineChartMultiple />
        <div className="flex flex-col">
          <span className="text-xl font-semibold">Recent Emails</span>
          <div className="w-full flex flex-col gap-4">
            {[
              {
                avatar: "/images/african-headshot1.png",
                name: "Hannah Morgan",
                about: "meeting scheduled",
                time: "1:24pm",
              },
              {
                avatar: "/images/african-headshot1.png",
                name: "Hannah Morgan",
                about: "meeting scheduled",
                time: "1:24pm",
              },
              {
                avatar: "/images/african-headshot1.png",
                name: "Hannah Morgan",
                about: "meeting scheduled",
                time: "1:24pm",
              },
              {
                avatar: "/images/african-headshot1.png",
                name: "Hannah Morgan",
                about: "meeting scheduled",
                time: "1:24pm",
              },
            ].map((item, index) => (
              <Link href={`/dashboard/user/${index}`} key={index}>
                <div className="w-full p-2 flex justify-between items-center rounded-2xl hover:shadow-[rgba(117,_115,_199,_0.30)_0px_0px_16px] transition-shadow duration-500">
                  <Image
                    src={item.avatar}
                    alt="blur"
                    width={500}
                    height={500}
                    className={`w-8 h-8 rounded-full`}
                  />
                  <span className="text-gray-500 text-sm">{item.name}</span>
                  <span className="text-gray-500 text-sm">{item.about}</span>
                  <span className="text-gray-500 text-sm">{item.time}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[30%] p-4 bg-[#F2F2FC] rounded-xl min-h-full">kkkkkkkk</div>
    </div>
  );
}
