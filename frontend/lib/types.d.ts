export interface donationBreakdownData {
    value: number;
    color: string;
    content: string;
}

// Define a type for the form state
export type CampaignFormState = {
  name: string;
  campaignImages: File[]; // Array of image URLs (base64 or paths)
  description: string;
  date: string;
  status: "draft" | "ongoing" | "completed"; // Specific possible values for status
  category:  "Youths" | "Medical & Health" | "Education" | "Widows & Orphans" | "Social Economic Empowerment" | 
  "Public Awareness" | "Save A Soul" | "Prison";
};

export type CampaignType = {
  campaignImages: string[];
  status: CampaignFormState["status"];
  name: string;
  category: CampaignFormState["category"];
  description: string;
  date: string;
  _id: number;
};