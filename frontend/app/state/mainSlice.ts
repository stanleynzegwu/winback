import { CampaignFormState } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface fetchedGeneralDataObjState {
    mediaHubData: {mediaImages: string[]}[];
    campaignData: {
        campaignImages:string[];
        name:string;
        description:string;
        status: CampaignFormState['status'];
        category: CampaignFormState['category']
        date:string;
        _id: number
    }[]
}

interface GeneralState {
  hasFetchedGeneralData: boolean;
  fetchedGeneralDataObj: fetchedGeneralDataObjState
}

const initialState: GeneralState = {
  hasFetchedGeneralData: false,
  fetchedGeneralDataObj: {
    mediaHubData: [],
    campaignData: []
  }
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    sethasFetchedGeneralData: (state, action: PayloadAction<boolean>) => {
      state.hasFetchedGeneralData = action.payload;
    },
    setGeneralData: (state, action: PayloadAction<fetchedGeneralDataObjState>) => {
      state.fetchedGeneralDataObj = action.payload;
    },
  },
});

export const { sethasFetchedGeneralData, setGeneralData } = mainSlice.actions;
export default mainSlice.reducer;
