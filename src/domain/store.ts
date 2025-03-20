import { configureStore } from "@reduxjs/toolkit";
import { groupsApiSlice } from "./features/groupApiSlice";

export const store = configureStore({
  reducer: {
    [groupsApiSlice.reducerPath]: groupsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(groupsApiSlice.middleware),
});
