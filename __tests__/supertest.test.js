const request = require('supertest');
// const app = require('../server');
// const request = supertest(app);

describe('get reviews route', () => {
  jest.setTimeout(30000);
  it ('responds with 200', (done) => {
    request('http://localhost:8000')
      .get('/reviews?page=1&count=5&sort=newest&product_id=20')
      .expect(200, done);
  });
});