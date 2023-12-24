import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data, options = {}) => {
    let headers = options.headers || {};

    return axios({
        method: method,
        url: url,
        headers: headers,
        withCredentials: options.withCredentials || true,
        data: data,
        params: options.params || {}
    });
};
