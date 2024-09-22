// src/redux/slices/runSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recentRun: {
    dailyWater: 72,
    weeklyDistance: 21,
  },
  previousRuns: [],
  heartRate: 0,
  sweat: 0,
  weather: {
    temperature: 0,
    condition: "",
  },
  zoneAvg: 0,
};

const runSlice = createSlice({
  name: "run",
  initialState,
  reducers: {
    updateRecentRun: (state, action) => {
      state.recentRun = action.payload;
    },
    addPreviousRun: (state, action) => {
      state.previousRuns.push(action.payload);
    },
    updateHeartRate: (state, action) => {
      state.heartRate = action.payload;
    },
    updateSweat: (state, action) => {
      state.sweat = action.payload;
    },
    updateWeather: (state, action) => {
      state.weather = action.payload;
    },
    updateZoneAvg: (state, action) => {
      state.zoneAvg = action.payload;
    },
  },
});

export const {
  updateRecentRun,
  addPreviousRun,
  updateHeartRate,
  updateSweat,
  updateWeather,
  updateZoneAvg,
} = runSlice.actions;

export default runSlice.reducer;
