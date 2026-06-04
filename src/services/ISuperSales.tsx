export interface IinitialState {
    SSLoginData:any;
    loading: boolean;
    error: string | null;
    apiStatus: {
        [key: string]: {
            loading: boolean;
            success: boolean;
            error: string | null;
        }
    };
}

export const initialState: IinitialState = {
    SSLoginData:[],
    loading: false,
    error: null,
    apiStatus: {
        SSLoginData: { loading: false, success: false, error: null },
    },
}