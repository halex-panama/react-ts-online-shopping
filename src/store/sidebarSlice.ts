import { createSlice } from "@reduxjs/toolkit";

export type initialStateType = {
  isSideBarOn: boolean;
};

const initialState: initialStateType = {
  isSideBarOn: false,
};

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarOn: (state) => {
      state.isSideBarOn = true;
    },
    setSidebarOff: (state) => {
      state.isSideBarOn = false;
    },
  },
});

export const { setSidebarOn, setSidebarOff } = sideBarSlice.actions;
export default sideBarSlice.reducer;
