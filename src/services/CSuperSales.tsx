import { createSlice } from "@reduxjs/toolkit";
import { getSSLogin } from "./SuperSalesAction";
import { initialState } from "./ISuperSales";

const SuperSalesSlice = createSlice({
    name: "superSales",
    initialState,
    reducers: {
        resetSSLogin: (state) => {
            state.SSLoginData = null;
            state.loading = false;
            state.error = null;
            state.apiStatus.SSLoginData = { loading: false, success: false, error: null };
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSSLogin.pending, (state) => {
                state.loading = true;
                state.apiStatus.SSLoginData.loading = true;
                state.apiStatus.SSLoginData.success = false;
                state.apiStatus.SSLoginData.error = null;
                state.error = null;
            })
            .addCase(getSSLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.SSLoginData = action.payload;
                state.apiStatus.SSLoginData.loading = false;
                state.apiStatus.SSLoginData.success = true;
                state.apiStatus.SSLoginData.error = null;
            })
            .addCase(getSSLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch SS Login data";
                state.apiStatus.SSLoginData.loading = false;
                state.apiStatus.SSLoginData.success = false;
                state.apiStatus.SSLoginData.error = action.payload as string || "Failed to fetch SS Login data";
            });
    },
});

export const { resetSSLogin, clearError } = SuperSalesSlice.actions;
export default SuperSalesSlice.reducer;