import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:8080/v1'
});

class ApiService {
    constructor(url){
        this.url = url;
    }

    post(url, objeto){
        return httpClient.post(`${this.url}${url}`, objeto);
    }

    put(url, objeto){
        return httpClient.put(`${this.url}${url}`,objeto);
    }

    delete(url){
        return httpClient.delete(`${this.url}${url}`);
    }

    get(url){
        return httpClient.get(`${this.url}${url}`);
    }
}

export default ApiService;