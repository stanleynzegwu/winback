import axios from "axios";
import { CampaignFormState } from "./types";

//export const BASE_URL = "http://localhost:8000";
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// export const createCampaign = async (formData: FormData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/campaigns`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response.data; // Return API response data
//   } catch (error) {
//     console.error("Error creating campaign:", error);
//     throw error; // Propagate error to handle it in the component
//   }
// };
export const createCampaign = async (campaignData: CampaignFormState) => {
  try {
    const res = await publicRequest.post("/campaign", campaignData);
    return res.data; // Return API response data
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error; // Propagate error to handle it in the component
  }
};
