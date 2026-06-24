import Super_Sales from "../config/Axios";

class SuperSalesAPI {
    getSSLogin(email: string, password: string) {
        return Super_Sales.post(`/Login/login`, { email, password });
    }

    getFinancialYears() {
        return Super_Sales.get('/FinancialYear/getAll');
    }

    createFinancialYear(financialYearCode: string) {
        return Super_Sales.post('/FinancialYear/create', { financialYearCode });
    }

    updateFinancialYear(id: string, financialYearCode: string) {
        return Super_Sales.put(`/FinancialYear/update/${id}`, { financialYearCode });
    }

    deleteFinancialYear(id: string) {
        return Super_Sales.delete(`/FinancialYear/delete/${id}`);
    }

    getTabNames() {
        return Super_Sales.get('/TabName/getAll');
    }

    createTabName(tabName: string) {
        return Super_Sales.post('/TabName/create', { tabName });
    }

    updateTabName(id: string, tabName: string) {
        return Super_Sales.put(`/TabName/update/${id}`, { tabName });
    }

    deleteTabName(id: string) {
        return Super_Sales.delete(`/TabName/delete/${id}`);
    }
}

const superSalesAPI = new SuperSalesAPI();

export { superSalesAPI };
export default superSalesAPI;