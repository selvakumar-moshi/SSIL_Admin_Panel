import { createSlice } from "@reduxjs/toolkit";
import { createFinancialYear, updateFinancialYear, deleteFinancialYear, getFinancialYears, getSSLogin, getTabNames, createTabName, updateTabName, deleteTabName, getRegister, deleteUser, updateUser, getUsers, getReports, createReportWithFile, updateReport, deleteReport} from "./SuperSalesAction";
import { initialState } from "./ISuperSales";

const SuperSalesSlice = createSlice({
    name: "superSales",
    initialState,
    reducers: {
        resetSSLogin: (state) => {
            state.SSLoginData = null;
            state.RegisterData = null;
            state.UsersData = null;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = false;
            state.apiStatus.SSLoginData = { loading: false, success: false, error: null };
            state.apiStatus.RegisterData = { loading: false, success: false, error: null };
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
            .addCase(getRegister.pending, (state) => {
                state.loading = true;
                state.apiStatus.RegisterData.loading = true;
                state.apiStatus.RegisterData.success = false;
                state.apiStatus.RegisterData.error = null;
                state.error = null;
            })
            .addCase(getRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.RegisterData = action.payload;
                state.apiStatus.RegisterData.loading = false;
                state.apiStatus.RegisterData.success = true;
                state.apiStatus.RegisterData.error = null;
            })
            .addCase(getRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch Register data";
                state.apiStatus.RegisterData.loading = false;
                state.apiStatus.RegisterData.success = false;
                state.apiStatus.RegisterData.error = action.payload as string || "Failed to fetch Register data";
            });

        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.apiStatus.UsersData.loading = true;
                state.apiStatus.UsersData.success = false;
                state.apiStatus.UsersData.error = null;
                state.error = null;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch Users data";
                state.apiStatus.UsersData.loading = false;
                state.apiStatus.UsersData.success = false;
                state.apiStatus.UsersData.error = action.payload as string || "Failed to fetch Users data";
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.UsersData = action.payload;
                state.apiStatus.UsersData.loading = false;
                state.apiStatus.UsersData.success = true;
                state.apiStatus.UsersData.error = null;
            })
        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.apiStatus.UsersData.loading = true;
                state.apiStatus.UsersData.success = false;
                state.apiStatus.UsersData.error = null;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.UsersData = action.payload;
                state.apiStatus.UsersData.loading = false;
                state.apiStatus.UsersData.success = true;
                state.apiStatus.UsersData.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to update User";
                state.apiStatus.UsersData.loading = false;
                state.apiStatus.UsersData.success = false;
                state.apiStatus.UsersData.error = action.payload as string || "Failed to update User";
            });
        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.apiStatus.UsersData.loading = true;
                state.apiStatus.UsersData.success = false;
                state.apiStatus.UsersData.error = null;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.UsersData = action.payload;
                state.apiStatus.UsersData.loading = false;
                state.apiStatus.UsersData.success = true;
                state.apiStatus.UsersData.error = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to delete User";
                state.apiStatus.UsersData.loading = false;
                state.apiStatus.UsersData.success = false;
                state.apiStatus.UsersData.error = action.payload as string || "Failed to delete User";
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

            builder
            .addCase(getReports.pending, (state) => {
                state.loading = true;
                state.apiStatus.ReportsData.loading = true;
                state.apiStatus.ReportsData.success = false;
                state.apiStatus.ReportsData.error = null;
                state.error = null;
            })
            .addCase(getReports.fulfilled, (state, action) => {
                state.loading = false;
                state.ReportsData = action.payload;
                state.apiStatus.ReportsData.loading = false;
                state.apiStatus.ReportsData.success = true;
                state.apiStatus.ReportsData.error = null;
            })
            .addCase(getReports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch Reports data";
                state.apiStatus.ReportsData.loading = false;
                state.apiStatus.ReportsData.success = false;
                state.apiStatus.ReportsData.error = action.payload as string || "Failed to fetch Reports data";
            });

        builder
            .addCase(createReportWithFile.pending, (state) => {
                state.loading = true;
                state.apiStatus.ReportsData.loading = true;
                state.apiStatus.ReportsData.success = false;
                state.apiStatus.ReportsData.error = null;
                state.error = null;
            })
            .addCase(createReportWithFile.fulfilled, (state, action) => {
                state.loading = false;
                state.ReportsData = action.payload;
                state.apiStatus.ReportsData.loading = false;
                state.apiStatus.ReportsData.success = true;
                state.apiStatus.ReportsData.error = null;
            })
            .addCase(createReportWithFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to create Report";
                state.apiStatus.ReportsData.loading = false;
                state.apiStatus.ReportsData.success = false;
                state.apiStatus.ReportsData.error = action.payload as string || "Failed to create Report";
            });

        builder
            .addCase(updateReport.pending, (state) => {
                state.loading = true;
                state.apiStatus.ReportsData.loading = true;
                state.apiStatus.ReportsData.success = false;
                state.apiStatus.ReportsData.error = null;
                state.error = null;
            })
            .addCase(updateReport.fulfilled, (state, action) => {
                state.loading = false;
                state.ReportsData = action.payload;
                state.apiStatus.ReportsData.loading = false;
                state.apiStatus.ReportsData.success = true;
                state.apiStatus.ReportsData.error = null;
            })
            .addCase(updateReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to update Report";
                state.apiStatus.ReportsData.loading = false;
                state.apiStatus.ReportsData.success = false;
                state.apiStatus.ReportsData.error = action.payload as string || "Failed to update Report";
            });

            builder
                .addCase(deleteReport.pending, (state) => {
                    state.loading = true;
                    state.apiStatus.ReportsData.loading = true;
                    state.apiStatus.ReportsData.success = false;
                    state.apiStatus.ReportsData.error = null;
                    state.error = null;
                })
                .addCase(deleteReport.fulfilled, (state, action) => {
                    state.loading = false;
                    // Make sure the ReportsData is updated with the new data
                    state.ReportsData = action.payload;
                    state.apiStatus.ReportsData.loading = false;
                    state.apiStatus.ReportsData.success = true;
                    state.apiStatus.ReportsData.error = null;
                })
                .addCase(deleteReport.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string || "Failed to delete Report";
                    state.apiStatus.ReportsData.loading = false;
                    state.apiStatus.ReportsData.success = false;
                    state.apiStatus.ReportsData.error = action.payload as string || "Failed to delete Report";
                });
    },
});

export const { resetSSLogin, clearError, logout } = SuperSalesSlice.actions;
export default SuperSalesSlice.reducer;