import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface DashboardState {
  fetchedData: boolean;
  //campaigns: any[];
  donations: any[];
  users: any[];
}

type DashboardStateWithoutFetchedData = Omit<DashboardState, "fetchedData">;

// Initial state
const initialState: DashboardState = {
  fetchedData: false,
  //campaigns: [],
  donations: [],
  users: []
};

// Create Redux slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // Set fetched data
    setDashboardData: (state, action: PayloadAction<DashboardStateWithoutFetchedData>) => {
      //state.campaigns = action.payload.campaigns;
      state.donations = action.payload.donations;
      state.users = action.payload.users;
    },
    // Mark data as fetched
    setFetchedData: (state, action: PayloadAction<boolean>) => {
      state.fetchedData = action.payload;
    },
  },
});

// Export actions
export const { setDashboardData, setFetchedData } = dashboardSlice.actions;

// Export reducer
export default dashboardSlice.reducer;
