"use client";

import { useEffect } from "react";
import { publicRequest } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { setGeneralData, sethasFetchedGeneralData } from "../state/mainSlice";

export default function GlobalFetcher() {
  const dispatch = useDispatch<AppDispatch>();
  const hasFetched = useSelector((state: RootState) => state.main.hasFetchedGeneralData);

  useEffect(() => {
    if (!hasFetched) {
      const fetchGeneralData = async () => {
        try {
          const campaignRes = await publicRequest.get("/campaign");
          const mediaHubRes = await publicRequest.get("/media-hub");
          if (mediaHubRes.status === 200 && campaignRes.status === 200) {
            dispatch(
              setGeneralData({ mediaHubData: mediaHubRes.data, campaignData: campaignRes.data })
            ); // Store data
            dispatch(sethasFetchedGeneralData(true)); // Mark as fetched
          }
        } catch (error) {
          console.error("Failed to fetch general data:", error);
        }
      };

      fetchGeneralData();
    }
  }, [dispatch, hasFetched]);

  return null;
}
