export interface IinitialState {
    SSLoginData: any;
    RegisterData: any;
    UsersData: any;
    FinancialYearsData: any;
    TabNamesData: any;
    ReportsData: any;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    apiStatus: {
        [key: string]: {
            loading: boolean;
            success: boolean;
            error: string | null;
        }
    };
}

export const initialState: IinitialState = {
    SSLoginData: [],
    RegisterData: [],
    UsersData: [],
    FinancialYearsData: [],
    TabNamesData: [],
    ReportsData: [],
    loading: false,
    error: null,
    isAuthenticated: false,
    apiStatus: {
        SSLoginData: { loading: false, success: false, error: null },
        RegisterData: { loading: false, success: false, error: null },
        UsersData: { loading: false, success: false, error: null },
        FinancialYearsData: { loading: false, success: false, error: null },
        TabNamesData: { loading: false, success: false, error: null },
        ReportsData: { loading: false, success: false, error: null },
    },
}