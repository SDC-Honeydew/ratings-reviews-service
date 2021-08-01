const app = require('../server/server.js');
const request = require('supertest');

beforeEach(async () => {
  console.log('before the test runs');
  const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  await wait(1000);
})

describe('GET /reviews route', () => {

  it('responds to a get request with the expected number of reviews', async () => {
    const res = await request(app).get('/reviews?page=1&count=8&sort=newest&product_id=20')
      expect(res.body.count).toEqual(8)
  })
  it('responds to a get request with the correct status code', async () => {
    const res = await request(app).get('/reviews?page=1&count=8&sort=newest&product_id=20')
      expect(res.statusCode).toEqual(200)
  })
  xit('responds to a get request with the product code', async () => {
    const res = await request(app).get('/reviews?page=1&count=8&sort=newest&product_id=20')
      expect(res.body.product).toEqual('20')
  })

});

xdescribe('GET /meta route', () => {
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

xdescribe('POST /reviews route', () => {
  it('responds with 500 if there is no request body', async () => {
    const res = await request(app).post('/reviews/')
      expect(res.statusCode).toEqual(500)
  })
});

xdescribe('PUT /helpful route', () => {
  it('responds with 204', async () => {
    const res = await request(app).put('/reviews/000/helpful')
      expect(res.statusCode).toEqual(204)
  })
});

xdescribe('PUT /report route', () => {
  it('responds with 204', async () => {
    const res = await request(app).put('/reviews/000/report')
      expect(res.statusCode).toEqual(204)
  })
});

// const end = async () => {
//   await client.end();
// }

// afterAll(() => {
//   return end();
// });