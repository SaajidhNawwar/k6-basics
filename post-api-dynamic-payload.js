import http from "k6/http";
import { check, sleep } from "k6";
import {randomString} from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import faker from "https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js";

export const options = {
    vus: 10,
    duration: '5s',
};

export default function () {
    const url = 'https://reqres.in/api/users';

    const payload = JSON.stringify({
        name: faker.name.findName(),
        job: 'Software Engineer',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1',
        },
    };

    const response = http.post(url, payload, params);

    // Log payload and response
    console.log('Request Payload:', payload);
    console.log('Response Body:', response.body);

    check(response, {
        'Status is 201': (response) => response.status === 201,
        'Response Id Validation': (response) => response.body.includes('id'),
    });

    sleep(1);
}
