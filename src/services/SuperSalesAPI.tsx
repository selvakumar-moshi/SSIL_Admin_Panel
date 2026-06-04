import Super_Sales from "../config/Axios";

class SuperSalesAPI {
    getSSLogin(token: string) {
        return Super_Sales.post(`/login`, { token });
    }
}

const superSalesAPI = new SuperSalesAPI();

export { superSalesAPI };
export default superSalesAPI;