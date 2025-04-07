import axios from "axios";
import { CampaignFormState } from "./types";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const createCampaign = async (campaignData: CampaignFormState) => {
  try {
    const res = await publicRequest.post("/campaign", campaignData);
    return res.data; // Return API response data
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error; // Propagate error to handle it in the component
  }
};
