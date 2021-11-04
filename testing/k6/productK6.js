import http from 'k6/http';
// per second/ per VU
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2s', target: 10 }, // below normal load
    { duration: '2s', target: 100 },
    { duration: '10s', target: 500 }, // normal load
    { duration: '10s', target: 1000 }, // approaching the breaking point
    { duration: '2s', target: 1500 }, // around the breaking point
    { duration: '10s', target: 500 }, // scale down. Recovery stage
    { duration: '3s', target: 200 },
    { duration: '2s', target: 100 },
    { duration: '2s', target: 0 },
  ],
  thresholds: {
    http_req_failed: [{threshold: 'rate<0.01', abortOnFail: true}], // errors less than 1%
    // http_req_duration: [{threshold: 'p(90)<3000', abortOnFail: true}], // 95% of requests must complete below 1000ms
  }
};

export default function () {
  const BASE_URL = 'http://localhost:3005/products'; // make sure this is not production

  const productID =  Math.round((Math.random() * (1000000 - 1)) + 1);

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
