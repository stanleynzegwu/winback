import { CampaignFormState } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface fetchedGeneralDataObjState {
    mediaHubData: {mediaImages: string[],_id: string}[];
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
    updateCampaignData: (state, action: PayloadAction<fetchedGeneralDataObjState["campaignData"]>) => {
      state.fetchedGeneralDataObj.campaignData = action.payload;
    },
    updateMediaHubData: (state, action: PayloadAction<fetchedGeneralDataObjState["mediaHubData"]>) => {
      state.fetchedGeneralDataObj.mediaHubData = action.payload;
    },
  },
});

export const { sethasFetchedGeneralData, setGeneralData, updateCampaignData, updateMediaHubData } = mainSlice.actions;
export default mainSlice.reducer;
