import { createAsyncThunk } from "@reduxjs/toolkit";
import superSalesAPI from "./SuperSalesAPI";

export const getSSLogin = createAsyncThunk<any, { email: string; password: string }>(
    "userManagement/getSSLogin",
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.getSSLogin(email, password);
        return res?.data?.data;
      } catch (error: any) {
        // Extract message from error response
        const errorMessage = error.response?.data?.message || error.message || "Login failed";
        return rejectWithValue(errorMessage);
    }
  }
);

export const getRegister = createAsyncThunk<any, { firstName: string; lastName: string; jobTitle: string; email: string; password: string }>(
    "userManagement/getRegister",
    async ({ firstName, lastName, jobTitle, email, password }, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.getRegister(firstName, lastName, jobTitle, email, password);
        return res?.data?.data;
      } catch (error: any) {
        // Extract message from error response
        const errorMessage = error.response?.data?.message || error.message || "Registration failed";
        return rejectWithValue(errorMessage);
    } 
  }
);

export const getUsers = createAsyncThunk<any, void>(
    "userManagement/getUsers",
    async (_, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.getUsers();
        return res?.data?.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to fetch Users";
        return rejectWithValue(errorMessage);
    }
  }
);

export const updateUser = createAsyncThunk<any, { id: string; firstName: string; lastName: string; jobTitle: string; email: string; password?: string }>(
    "userManagement/updateUser",
    async ({ id, firstName, lastName, jobTitle, email, password }, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.updateUser(id, firstName, lastName, jobTitle, email, password);
        return res?.data?.data || res?.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to update User";
        return rejectWithValue(errorMessage);
    }
  }
);

export const deleteUser = createAsyncThunk<any, { id: string }>(
    "userManagement/deleteUser",
    async ({ id }, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.deleteUser(id);
        return res?.data?.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to delete User";
        return rejectWithValue(errorMessage);
    }
  }
);

export const getFinancialYears = createAsyncThunk<any, void>(
    "userManagement/getFinancialYears",
    async (_, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.getFinancialYears();
        return res?.data?.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to fetch Financial Years";
        return rejectWithValue(errorMessage);
    }
  }
);

export const createFinancialYear = createAsyncThunk<any, { financialYearCode: string }>(
    "userManagement/createFinancialYear",
    async ({ financialYearCode }, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.createFinancialYear(financialYearCode);
        return res?.data?.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to create Financial Year";
        return rejectWithValue(errorMessage);
    }
  }
);

export const updateFinancialYear = createAsyncThunk<any, { id: string; financialYearCode: string }>(
    "userManagement/updateFinancialYear",
    async ({ id, financialYearCode }, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.updateFinancialYear(id, financialYearCode);
        return res?.data?.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to update Financial Year";
        return rejectWithValue(errorMessage);
    }
  }
);

export const deleteFinancialYear = createAsyncThunk<any, { id: string }>(
    "userManagement/deleteFinancialYear",
    async ({ id }, { rejectWithValue }) => {
      try {
        const res = await superSalesAPI.deleteFinancialYear(id);
        return res?.data?.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Failed to delete Financial Year";
        return rejectWithValue(errorMessage);
    }
  }
);

export const getTabNames = createAsyncThunk<any, void>(
  "userManagement/getTabNames",
  async (_, { rejectWithValue }) => {
      try {
          const res = await superSalesAPI.getTabNames();
          return res?.data?.data;
      } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || "Failed to fetch Tab Names";
          return rejectWithValue(errorMessage);
      }
  }
);

export const createTabName = createAsyncThunk<any, { tabName: string }>(
  "userManagement/createTabName",
  async ({ tabName }, { rejectWithValue }) => {
      try {
          const res = await superSalesAPI.createTabName(tabName);
          return res?.data?.data;
      } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || "Failed to create Tab Name";
          return rejectWithValue(errorMessage);
      }
  }
);

export const updateTabName = createAsyncThunk<any, { id: string; tabName: string }>(
  "userManagement/updateTabName",
  async ({ id, tabName }, { rejectWithValue }) => {
      try {
          const res = await superSalesAPI.updateTabName(id, tabName);
          return res?.data?.data;
      } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || "Failed to update Tab Name";
          return rejectWithValue(errorMessage);
      }
  }
);

export const deleteTabName = createAsyncThunk<any, { id: string }>(
  "userManagement/deleteTabName",
  async ({ id }, { rejectWithValue }) => {
      try {
          const res = await superSalesAPI.deleteTabName(id);
          return res?.data?.data;
      } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || "Failed to delete Tab Name";
          return rejectWithValue(errorMessage);
      }
  }
);

export const getReports = createAsyncThunk<any, void>(
  "userManagement/getReports",
  async (_, { rejectWithValue }) => {
      try {
          const res = await superSalesAPI.getReports();
          return res?.data?.data;
      } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || "Failed to fetch Reports";
          return rejectWithValue(errorMessage);
      }
  }
);

export const createReportWithFile = createAsyncThunk<any, FormData>(
  "userManagement/createReportWithFile",
  async (formData, { rejectWithValue }) => {
      try {
          const res = await superSalesAPI.createReportWithFile(formData);
          return res?.data?.data;
      } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || "Failed to create Report";
          return rejectWithValue(errorMessage);
      }
  }
);

export const updateReport = createAsyncThunk<any, { id: string; formData: FormData }>(
  "userManagement/updateReport",
  async ({ id, formData }, { rejectWithValue }) => {
      try {
          const res = await superSalesAPI.updateReport(id, formData);
          return res?.data?.data;
      } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || "Failed to update Report";
          return rejectWithValue(errorMessage);
      }
  }
);

export const deleteReport = createAsyncThunk<any, { id: string }>(
  "userManagement/deleteReport",
  async ({ id }, { rejectWithValue }) => {
      try {
          const res = await superSalesAPI.deleteReport(id);
          return res?.data?.data;
      } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || "Failed to delete Report";
          return rejectWithValue(errorMessage);
      }
  }
);