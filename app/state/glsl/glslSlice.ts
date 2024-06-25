import { createSlice } from "@reduxjs/toolkit";

interface GlslState {
  hasIntroCompleted: boolean;
}

const initialState: GlslState = {
  hasIntroCompleted: false,
};

const glslSlice = createSlice({
  name: "hasIntroCompleted",
  initialState,
  reducers: {
    updateIntroCompleted: (state) => {
      state.hasIntroCompleted = !state.hasIntroCompleted;
    },
  }
});

export const { updateIntroCompleted } = glslSlice.actions;

export default glslSlice.reducer;