import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface fetchedGeneralDataObjState {
    mediaHubData: {mediaImages: string[]}[];
}

interface GeneralState {
  hasFetchedGeneralData: boolean;
  fetchedGeneralDataObj: fetchedGeneralDataObjState
}

const initialState: GeneralState = {
  hasFetchedGeneralData: false,
  fetchedGeneralDataObj: {
    mediaHubData: []
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
