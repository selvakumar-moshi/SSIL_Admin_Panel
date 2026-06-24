import { createSlice } from "@reduxjs/toolkit";
import { createFinancialYear, updateFinancialYear, deleteFinancialYear, getFinancialYears, getSSLogin, getTabNames, createTabName, updateTabName, deleteTabName } from "./SuperSalesAction";
import { initialState } from "./ISuperSales";

const SuperSalesSlice = createSlice({
    name: "superSales",
    initialState,
    reducers: {
        resetSSLogin: (state) => {
            state.SSLoginData = null;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = false;
            state.apiStatus.SSLoginData = { loading: false, success: false, error: null };
        },
        clearError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.SSLoginData = null;
            state.apiStatus.SSLoginData = { loading: false, success: false, error: null };
        }
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
                state.isAuthenticated = true;
                state.apiStatus.SSLoginData.loading = false;
                state.apiStatus.SSLoginData.success = true;
                state.apiStatus.SSLoginData.error = null;
            })
            .addCase(getSSLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch SS Login data";
                state.isAuthenticated = false;
                state.apiStatus.SSLoginData.loading = false;
                state.apiStatus.SSLoginData.success = false;
                state.apiStatus.SSLoginData.error = action.payload as string || "Failed to fetch SS Login data";
            });
        builder
            .addCase(getFinancialYears.pending, (state) => {
                state.loading = true;
                state.apiStatus.FinancialYearsData.loading = true;
                state.apiStatus.FinancialYearsData.success = false;
                state.apiStatus.FinancialYearsData.error = null;
                state.error = null;
            })
            .addCase(getFinancialYears.fulfilled, (state, action) => {
                state.loading = false;
                state.FinancialYearsData = action.payload;
                state.apiStatus.FinancialYearsData.loading = false;
                state.apiStatus.FinancialYearsData.success = true;
                state.apiStatus.FinancialYearsData.error = null;
            })
            .addCase(getFinancialYears.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch Financial Years data";
                state.apiStatus.FinancialYearsData.loading = false;
                state.apiStatus.FinancialYearsData.success = false;
                state.apiStatus.FinancialYearsData.error = action.payload as string || "Failed to fetch Financial Years data";
            });

        builder
            .addCase(createFinancialYear.pending, (state) => {
                state.loading = true;
                state.apiStatus.FinancialYearsData.loading = true;
                state.apiStatus.FinancialYearsData.success = false;
                state.apiStatus.FinancialYearsData.error = null;
                state.error = null;
            })
            .addCase(createFinancialYear.fulfilled, (state, action) => {
                state.loading = false;
                state.FinancialYearsData = action.payload;
                state.apiStatus.FinancialYearsData.loading = false;
                state.apiStatus.FinancialYearsData.success = true;
                state.apiStatus.FinancialYearsData.error = null;
            })
            .addCase(createFinancialYear.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to create Financial Year";
                state.apiStatus.FinancialYearsData.loading = false;
                state.apiStatus.FinancialYearsData.success = false;
                state.apiStatus.FinancialYearsData.error = action.payload as string || "Failed to create Financial Year";
            });

        builder
            .addCase(updateFinancialYear.pending, (state) => {
                state.loading = true;
                state.apiStatus.FinancialYearsData.loading = true;
                state.apiStatus.FinancialYearsData.success = false;
                state.apiStatus.FinancialYearsData.error = null;
                state.error = null;
            })
            .addCase(updateFinancialYear.fulfilled, (state, action) => {
                state.loading = false;
                state.FinancialYearsData = action.payload;
                state.apiStatus.FinancialYearsData.loading = false;
                state.apiStatus.FinancialYearsData.success = true;
                state.apiStatus.FinancialYearsData.error = null;
            })
            .addCase(updateFinancialYear.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to update Financial Year";
                state.apiStatus.FinancialYearsData.loading = false;
                state.apiStatus.FinancialYearsData.success = false;
                state.apiStatus.FinancialYearsData.error = action.payload as string || "Failed to update Financial Year";
            });

        builder
            .addCase(deleteFinancialYear.pending, (state) => {
                state.loading = true;
                state.apiStatus.FinancialYearsData.loading = true;
                state.apiStatus.FinancialYearsData.success = false;
                state.apiStatus.FinancialYearsData.error = null;
                state.error = null;
            })
            .addCase(deleteFinancialYear.fulfilled, (state, action) => {
                state.loading = false;
                state.FinancialYearsData = action.payload;
                state.apiStatus.FinancialYearsData.loading = false;
                state.apiStatus.FinancialYearsData.success = true;
                state.apiStatus.FinancialYearsData.error = null;
            })
            .addCase(deleteFinancialYear.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to delete Financial Year";
                state.apiStatus.FinancialYearsData.loading = false;
                state.apiStatus.FinancialYearsData.success = false;
                state.apiStatus.FinancialYearsData.error = action.payload as string || "Failed to delete Financial Year";
            });

        // NEW: Tab Name cases
        builder
            .addCase(getTabNames.pending, (state) => {
                state.loading = true;
                state.apiStatus.TabNamesData.loading = true;
                state.apiStatus.TabNamesData.success = false;
                state.apiStatus.TabNamesData.error = null;
                state.error = null;
            })
            .addCase(getTabNames.fulfilled, (state, action) => {
                state.loading = false;
                state.TabNamesData = action.payload;
                state.apiStatus.TabNamesData.loading = false;
                state.apiStatus.TabNamesData.success = true;
                state.apiStatus.TabNamesData.error = null;
            })
            .addCase(getTabNames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch Tab Names data";
                state.apiStatus.TabNamesData.loading = false;
                state.apiStatus.TabNamesData.success = false;
                state.apiStatus.TabNamesData.error = action.payload as string || "Failed to fetch Tab Names data";
            });

        builder
            .addCase(createTabName.pending, (state) => {
                state.loading = true;
                state.apiStatus.TabNamesData.loading = true;
                state.apiStatus.TabNamesData.success = false;
                state.apiStatus.TabNamesData.error = null;
                state.error = null;
            })
            .addCase(createTabName.fulfilled, (state, action) => {
                state.loading = false;
                state.TabNamesData = action.payload;
                state.apiStatus.TabNamesData.loading = false;
                state.apiStatus.TabNamesData.success = true;
                state.apiStatus.TabNamesData.error = null;
            })
            .addCase(createTabName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to create Tab Name";
                state.apiStatus.TabNamesData.loading = false;
                state.apiStatus.TabNamesData.success = false;
                state.apiStatus.TabNamesData.error = action.payload as string || "Failed to create Tab Name";
            });

        builder
            .addCase(updateTabName.pending, (state) => {
                state.loading = true;
                state.apiStatus.TabNamesData.loading = true;
                state.apiStatus.TabNamesData.success = false;
                state.apiStatus.TabNamesData.error = null;
                state.error = null;
            })
            .addCase(updateTabName.fulfilled, (state, action) => {
                state.loading = false;
                state.TabNamesData = action.payload;
                state.apiStatus.TabNamesData.loading = false;
                state.apiStatus.TabNamesData.success = true;
                state.apiStatus.TabNamesData.error = null;
            })
            .addCase(updateTabName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to update Tab Name";
                state.apiStatus.TabNamesData.loading = false;
                state.apiStatus.TabNamesData.success = false;
                state.apiStatus.TabNamesData.error = action.payload as string || "Failed to update Tab Name";
            });

        builder
            .addCase(deleteTabName.pending, (state) => {
                state.loading = true;
                state.apiStatus.TabNamesData.loading = true;
                state.apiStatus.TabNamesData.success = false;
                state.apiStatus.TabNamesData.error = null;
                state.error = null;
            })
            .addCase(deleteTabName.fulfilled, (state, action) => {
                state.loading = false;
                state.TabNamesData = action.payload;
                state.apiStatus.TabNamesData.loading = false;
                state.apiStatus.TabNamesData.success = true;
                state.apiStatus.TabNamesData.error = null;
            })
            .addCase(deleteTabName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to delete Tab Name";
                state.apiStatus.TabNamesData.loading = false;
                state.apiStatus.TabNamesData.success = false;
                state.apiStatus.TabNamesData.error = action.payload as string || "Failed to delete Tab Name";
            });
    },
});

export const { resetSSLogin, clearError, logout } = SuperSalesSlice.actions;
export default SuperSalesSlice.reducer;