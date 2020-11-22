import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:8081'
});

class ApiService {

    constructor(url) {
        this.url = url;
    }

    post(url, object) {
        return httpClient.post(this.requestURL(url), object);
    }

    put(url, object) {
        return httpClient.put(this.requestURL(url), object);
    }

    delete(url) {
        return httpClient.delete(this.requestURL(url));
    }

    get(url) {
        return httpClient.get(this.requestURL(url));
    }

    requestURL(url) {
        return `${this.url}${url}`;
    }
}

export default ApiService;