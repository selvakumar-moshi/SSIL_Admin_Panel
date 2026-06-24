import { createAsyncThunk } from "@reduxjs/toolkit";
import superSalesAPI from "./SuperSalesAPI";

export const getSSLogin = createAsyncThunk<any, { email: string; password: string }>(
    "userManagement/getSSLogin",
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.getSSLogin(email, password);
        return res?.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getFinancialYears = createAsyncThunk<any, void>(
    "userManagement/getFinancialYears",
    async (_, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.getFinancialYears();
        return res?.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createFinancialYear = createAsyncThunk<any, { financialYearCode: string }>(
    "userManagement/createFinancialYear",
    async ({ financialYearCode }, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.createFinancialYear(financialYearCode);
        return res?.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateFinancialYear = createAsyncThunk<any, { id: string; financialYearCode: string }>(
    "userManagement/updateFinancialYear",
    async ({ id, financialYearCode }, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.updateFinancialYear(id, financialYearCode);
        return res?.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteFinancialYear = createAsyncThunk<any, { id: string }>(
    "userManagement/deleteFinancialYear",
    async ({ id }, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.deleteFinancialYear(id);
        return res?.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getTabNames = createAsyncThunk<any, void>(
  "userManagement/getTabNames",
  async (_, { rejectWithValue }) => {
      try {
          const res = await superSalesAPI.getTabNames();
          return res?.data;
      } catch (error: any) {
          return rejectWithValue(error.response?.data || error.message);
      }
  }
);

export const createTabName = createAsyncThunk<any, { tabName: string }>(
  "userManagement/createTabName",
  async ({ tabName }, { rejectWithValue }) => {
      try {
          const res = await superSalesAPI.createTabName(tabName);
          return res?.data;
      } catch (error: any) {
          return rejectWithValue(error.response?.data || error.message);
      }
  }
);

export const updateTabName = createAsyncThunk<any, { id: string; tabName: string }>(
  "userManagement/updateTabName",
  async ({ id, tabName }, { rejectWithValue }) => {
      try {
          const res = await superSalesAPI.updateTabName(id, tabName);
          return res?.data;
      } catch (error: any) {
          return rejectWithValue(error.response?.data || error.message);
      }
  }
);

export const deleteTabName = createAsyncThunk<any, { id: string }>(
  "userManagement/deleteTabName",
  async ({ id }, { rejectWithValue }) => {
      try {
          const res = await superSalesAPI.deleteTabName(id);
          return res?.data;
      } catch (error: any) {
          return rejectWithValue(error.response?.data || error.message);
      }
  }
);