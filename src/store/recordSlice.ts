import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const recordSlice = createSlice({
  name: "record",
  initialState: {
    owner: '',
    url: '',
    isOwner: false
  },
  reducers: {
    setOwner : (state : any, action: PayloadAction<string>) => {
      state.owner = action.payload 
    },
    setUrl : (state : any, action: PayloadAction<string>) => {
      state.url = action.payload
    },
    setIsOwner : (state : any, action: PayloadAction<boolean>) => {
      state.isOwner = action.payload
    },
  },
});

export const { setOwner, setUrl, setIsOwner } = recordSlice.actions;
export const selectOwner = (state: RootState) => state.record.owner;
export const selectUrl = (state: RootState) => state.record.url;
export const selectIsOwner = (state: RootState) => state.record.isOwner;

export default recordSlice.reducer;
