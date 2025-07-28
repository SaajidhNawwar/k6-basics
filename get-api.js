import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 10,
    iterations: 20,
}

let headers_api = {
    'Authorization': "Bearer f564ca35013b01ebf56f6284dd211b97f9cededadaffaca0de8b0bde23c45260"
}

export default function () {
    const response = http.get("https://gorest.co.in/public/v2/users/", { headers: headers_api });
    check(response, {
        "Status is 200":(response) => response.status === 200,
    })
}