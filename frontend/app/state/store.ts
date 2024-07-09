import { configureStore } from "@reduxjs/toolkit";
import glslReducer from "./glsl/glslSlice";
import sessionReducer from "./sessionSlice";

export const store = configureStore({
  reducer: {
    glsl: glslReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;