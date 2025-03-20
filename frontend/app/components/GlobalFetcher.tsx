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
          const res = await publicRequest.get("/media-hub");
          if (res.status === 200) {
            dispatch(setGeneralData({ mediaHubData: res.data })); // Store data
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
