export interface IinitialState {
    SSLoginData: any;
    FinancialYearsData: any;
    TabNamesData: any;
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
    FinancialYearsData: [],
    TabNamesData: [], 
    loading: false,
    error: null,
    isAuthenticated: false,
    apiStatus: {
        SSLoginData: { loading: false, success: false, error: null },
        FinancialYearsData: { loading: false, success: false, error: null },
        TabNamesData: { loading: false, success: false, error: null },
    },
}