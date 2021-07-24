const app = require('../server/server.js');
const request = require('supertest');

// to actually test the database
// before each test, make a new database
// insert some data into it

// run tests on the data

// after each test, delete the database

describe('GET /reviews route', () => {
  it('responds to a get request with the expected number of reviews', async () => {
    const res = await request(app).get('/reviews?page=1&count=8&sort=newest&product_id=20')
      expect(res.body.count).toEqual(8)
  })
  it('responds to a get request with the correct status code', async () => {
    const res = await request(app).get('/reviews?page=1&count=8&sort=newest&product_id=20')
      expect(res.statusCode).toEqual(200)
  })
  it('responds to a get request with the product code', async () => {
    const res = await request(app).get('/reviews?page=1&count=8&sort=newest&product_id=20')
      // console.log(res.body)
      expect(res.body.product).toEqual('20')
  })
});

describe('GET /meta route', () => {
  it('responds with the correct status code', async () => {
    const res = await request(app).get('/reviews/meta?product_id=1')
      expect(res.statusCode).toEqual(200)
  })
  it('responds with the correct status code', async () => {
    const res = await request(app).get('/reviews/meta?product_id=1')
      expect(res.statusCode).toEqual(200)
  })
  it('contains the correct keys', async () => {
    const res = await request(app).get('/reviews/meta?product_id=1')
      expect(res.body.product_id).toEqual('1')
      expect(res.body.ratings).toBeTruthy
      expect(res.body.recommended).toBeTruthy
      expect(res.body.characteristics).toBeTruthy
  })

});

describe('POST /reviews route', () => {
  it('responds with 500 if there is no request body', async () => {
    const res = await request(app).post('/reviews/')
      expect(res.statusCode).toEqual(500)
  })
});

describe('PUT /helpful route', () => {
  it('responds with 204', async () => {
    const res = await request(app).put('/reviews/000/helpful')
      expect(res.statusCode).toEqual(204)
  })
});

describe('PUT /report route', () => {
  it('responds with 204', async () => {
    const res = await request(app).put('/reviews/000/report')
      expect(res.statusCode).toEqual(204)
  })
});