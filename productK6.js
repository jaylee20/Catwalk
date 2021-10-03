import http from 'k6/http';
// per second/ per VU
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2s', target: 10 }, // below normal load
    { duration: '5s', target: 100 },
    { duration: '5s', target: 200 }, // normal load
    { duration: '2s', target: 300 }, // around the breaking point
    { duration: '2s', target: 400 }, // beyond the breaking point
    { duration: '5s', target: 300 }, // scale down. Recovery stage
    { duration: '3s', target: 200 },
    { duration: '2s', target: 100 },
    { duration: '2s', target: 0 },
  ],
  thresholds: {
    http_req_failed: [{threshold: 'rate<0.01', abortOnFail: true}], // errors less than 1%
    http_req_duration: [{threshold: 'p(95)<1000', abortOnFail: true}], // 95% of requests must complete below 1000ms
  }
};

export default function () {
  const BASE_URL = 'http://localhost:3000/products'; // make sure this is not production

  const productID =  Math.round((Math.random() * (25 - 1)) + 1);

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/${productID}`,
      null,
      { tags: { name: 'ProductInfo' } },
    ],
    [
      'GET',
      `${BASE_URL}/${productID}/styles`,
      null,
      { tags: { name: 'ProductStyles' } },
    ],
    [
      'GET',
      `${BASE_URL}/${productID}/related`,
      null,
      { tags: { name: 'RelatedProducts' } },
    ]
  ]);
  sleep(1);
}
