const app = require('../server/server.js');
const supertest = require('supertest');
const request = supertest(app);

describe('/get/reviews route', () => {

  it('responds to a get request with the correct content type ', done => {
    request.get('/reviews?page=1&count=20&sort=newest&product_id=20')
      .expect('Content-Type', /json/)
      .then(() => {
        done();
      })
  })

  it('responds to a get request with the correct status code', done => {
    request.get('/reviews?page=1&count=20&sort=newest&product_id=20')
      .expect(200, done);
  })

  xit('responds to a get request with the product code', done => {
    request.get('/reviews?page=1&count=20&sort=newest&product_id=20')
      .expect(200)
      .then(response => {
        expect(response.product, '20')
        done();
    })
    .catch(err => done(err))
  })
});