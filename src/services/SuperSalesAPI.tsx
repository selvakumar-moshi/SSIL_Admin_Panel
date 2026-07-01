import Super_Sales from "../config/Axios";

class SuperSalesAPI {
    getSSLogin(email: string, password: string) {
        return Super_Sales.post(`/Login/login`, { email, password });
    }

    getRegister(firstName: string, lastName: string, jobTitle: string, email: string, password: string) {
        return Super_Sales.post(`/Login/register`, { firstName, lastName, jobTitle, email, password });
    }

    getUsers() {
        return Super_Sales.get('/User/getAllUsers');
    }

    updateUser(id: string, firstName: string, lastName: string, jobTitle: string, email: string, password?: string) {
        const payload: any = { firstName, lastName, jobTitle, email };
        if (password && password.trim() !== '') {
            payload.password = password;
        }
        // Send ID as path parameter
        return Super_Sales.put(`/User/updateUser/${id}`, payload);
    }

    deleteUser(id: string) {
        return Super_Sales.delete(`/User/deleteUser/${id}`);
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

    getReports() {
        return Super_Sales.get('/Report/getAll');
    }

    createReportWithFile(formData: FormData) {
        return Super_Sales.post('/Report/createWithFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    updateReport(id: string, formData: FormData) {
        return Super_Sales.put(`/Report/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    deleteReport(id: string) {
        return Super_Sales.delete(`/Report/delete/${id}`);
    }
}

const superSalesAPI = new SuperSalesAPI();

export { superSalesAPI };
export default superSalesAPI;