import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 10,
    duration: '5s',
};

export default function () {
    const url = 'https://reqres.in/api/users';

    const payload = JSON.stringify({
        name: 'Saajidh Nawwar',
        job: 'Software Engineer',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1',
        },
    };

    const response = http.post(url, payload, params);

    check(response, {
        'Status is 201': (response) => response.status === 201,
        'Response Id Validation': (response) => response.body.includes('id'),
    });

    sleep(1);
}
