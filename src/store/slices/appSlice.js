import { createSlice } from "@reduxjs/toolkit";

const initialStateData = {
  globalAlert: {
    type: "",
    title: "",
    message: "",
  },
  timeZone: "",
  theme: {
    colorPrimary: "#6773FFDF",
    colorLink: "#6773FFDF",
  },
  isLoad: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialStateData,
  reducers: {
    setLoading: (state, action) => {
      state.isLoad = action.payload;
    },
    updateGlobalAlert: (state, actions) => {
      state.globalAlert = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, updateGlobalAlert } = appSlice.actions;

export default appSlice.reducer;
