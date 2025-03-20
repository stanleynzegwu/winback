import { configureStore } from "@reduxjs/toolkit";
import glslReducer from "./glsl/glslSlice";
import sessionReducer from "./sessionSlice";
import dashboardReducer from "./dashboardSlice";
import mainReducer from "./mainSlice";

export const store = configureStore({
  reducer: {
    glsl: glslReducer,
    session: sessionReducer,
    dashboard: dashboardReducer,
    main: mainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
