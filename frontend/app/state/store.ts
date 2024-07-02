import { configureStore } from "@reduxjs/toolkit";
import glslReducer from "./glsl/glslSlice";

export const store = configureStore({
  reducer: {
    glsl: glslReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;