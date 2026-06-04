import { createAsyncThunk } from "@reduxjs/toolkit";
import superSalesAPI from "./SuperSalesAPI";

export const getSSLogin: any = createAsyncThunk(
    "userManagement/getSSLogin",
    async (token: string, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.getSSLogin(token);
        return res?.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );