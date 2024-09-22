// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import runReducer from "./slices/runSlice";

export const store = configureStore({
  reducer: {
    run: runReducer,
  },
});
