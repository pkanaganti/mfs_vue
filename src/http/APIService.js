/* eslint-disable */
import axios from 'axios';
const API_URL = 'https://pkanaganti.pythonanywhere.com/';  /* http://localhost:8000 */

export class APIService {
    constructor() {

    }

    getCustomer(param_pk) {
        const url = `${API_URL}/api/customers/${param_pk}`;
        let jwtToken = localStorage.getItem('token');
        console.log(":::jwtToken:::::" + jwtToken);
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.get(url, { headers: { Authorization: `jwt ${jwtToken}` } });
    }

    getCustomerList() {
        const url = `${API_URL}/api/customers/`;
        let jwtToken = localStorage.getItem('token');
        console.log(":::jwtToken:::::" + jwtToken);
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.get(url, { headers: headers });

    }

    addNewCustomer(customer) {
        const url = `${API_URL}/api/customers/`;
        let jwtToken = localStorage.getItem('token');
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.post(url, customer, { headers: headers });
    }

    updateCustomer(customer) {
        const url = `${API_URL}/api/customers/${customer.pk}`;
        let jwtToken = localStorage.getItem('token');
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.put(url, customer, { headers: headers });
    }

    deleteCustomer(customer_Pk) {
        const url = `${API_URL}/api/customers/${customer_Pk}`;
        let jwtToken = localStorage.getItem('token');
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.delete(url, { headers: headers });
    }
    getService(param_pk) {
        const url = `${API_URL}/api/services/${param_pk}`;
        let jwtToken = localStorage.getItem('token');
        console.log(":::jwtToken:::::" + jwtToken);
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.get(url, { headers: { Authorization: `jwt ${jwtToken}` } });
    }

    getServiceList() {
        const url = `${API_URL}/api/services`;
        let jwtToken = localStorage.getItem('token');
        console.log(":::jwtToken:::::" + jwtToken);
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.get(url, { headers: headers });

    }

    addNewService(service) {
        const url = `${API_URL}/api/services/`;
        let jwtToken = localStorage.getItem('token');
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.post(url, service, { headers: headers });
    }

    updateService(service) {
        const url = `${API_URL}/api/services/${service.pk}`;
        let jwtToken = localStorage.getItem('token');
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.put(url, service, { headers: headers });
    }

    deleteService(service_Pk) {
        const url = `${API_URL}/api/services/${service_Pk}`;
        let jwtToken = localStorage.getItem('token');
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.delete(url, { headers: headers });
    }

    getProduct(param_pk) {
        const url = `${API_URL}/api/products/${param_pk}`;
        let jwtToken = localStorage.getItem('token');
        console.log(":::jwtToken:::::" + jwtToken);
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.get(url, { headers: { Authorization: `jwt ${jwtToken}` } });
    }

    getProductList() {
        const url = `${API_URL}/api/products`;
        let jwtToken = localStorage.getItem('token');
        console.log(":::jwtToken:::::" + jwtToken);
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.get(url, { headers: headers });
    }

    addNewProduct(product) {
        const url = `${API_URL}/api/products/`;
        let jwtToken = localStorage.getItem('token');
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.post(url, product, { headers: headers });
    }

    updateProduct(product) {
        const url = `${API_URL}/api/products/${product.pk}`;
        let jwtToken = localStorage.getItem('token');
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.put(url, product, { headers: headers });
    }

    deleteProduct(product_Pk) {
        const url = `${API_URL}/api/products/${product_Pk}`;
        let jwtToken = localStorage.getItem('token');
        const headers = { Authorization: `jwt ${jwtToken}` };
        return axios.delete(url, { headers: headers });
    }

    authenticateLogin(credentials) {
        const url = `${API_URL}/auth/`;
        return axios.post(url, credentials);
    }
}
