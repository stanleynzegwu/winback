"use client";

import { useEffect } from "react";
import { publicRequest } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/state/store";
import { setDashboardData, setFetchedData } from "@/app/state/dashboardSlice";

export default function DashboardDataFetcher() {
  const dispatch = useDispatch<AppDispatch>();
  const { fetchedData } = useSelector((state: RootState) => state.dashboard);
  console.log(fetchedData);

  useEffect(() => {
    if (!fetchedData) {
      const fetchDashboardData = async () => {
        try {
          const userResponse = await publicRequest.get("/users");
          if (userResponse.status === 200) {
            dispatch(
              setDashboardData({
                donations: userResponse.data, //later put donation data hee rathr than campaign
                users: userResponse.data,
              })
            );
            dispatch(setFetchedData(true));
          }
        } catch (error) {
          console.error("Failed to fetch Dashboard data:", error);
        }
      };

      fetchDashboardData();
    }
  }, [dispatch, fetchedData]);

  return null;
}
