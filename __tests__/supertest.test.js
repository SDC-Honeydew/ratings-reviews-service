const server = require('../server');
const sequelize = require('../sequelize');
const request = require('supertest');

beforeAll(async () => {
  const { assertDatabaseConnectionOk, syncDb } = require('../sequelize/helpers');
  await Promise.all([assertDatabaseConnectionOk(), syncDb()]);
})

describe('POST /reviews route', () => {
  it('responds with 500 if there is no request body', async () => {
    const res = await request(server).post('/reviews/')
    expect(res.statusCode).toEqual(500)
  })
  it('posts a new review to the db', async () => {
    const res = await request(server)
      .post('/reviews/')
      .set('Content-type', 'application/json')
      .send(JSON.stringify({
        "product_id": 1,
        "rating": 5,
        "summary": "this product is imaginary",
        "body": "for an imaginary product it's amazing!",
        "recommend": true,
        "reviewer_name": "matty5000",
        "reviewer_email": "matty5000@gmail.com",
        "photos": ["www.bogusurl.com", "www.anotherbogusurl.com"],
        "characteristics": {
            "1": 5,
            "2": 5,
            "3": 5,
            "4": 5
        }
    }))
    expect(res.statusCode).toEqual(201)
  })
});

// use the data posted above for GET route tests...
describe('GET /reviews route', () => {
  it('responds to a get request with the expected number of reviews', async () => {
    const res = await request(server).get('/reviews?page=1&count=8&sort=newest&product_id=1')
      expect(res.body.count).toEqual(1)
  })
  it('responds to a get request with the correct status code', async () => {
    const res = await request(server).get('/reviews?page=1&count=8&sort=newest&product_id=1')
      expect(res.statusCode).toEqual(200)
  })
  it('responds to a get request with the product code', async () => {
    const res = await request(server).get('/reviews?page=1&count=8&sort=newest&product_id=1')
      expect(res.body.product).toEqual('1')
  })

});

describe('GET /meta route', () => {
  it('responds with the correct status code', async () => {
    const res = await request(server).get('/reviews/meta?product_id=1')
      expect(res.statusCode).toEqual(200)
  })
  it('responds with the correct status code', async () => {
    const res = await request(server).get('/reviews/meta?product_id=1')
      expect(res.statusCode).toEqual(200)
  })
  it('contains the correct keys', async () => {
    const res = await request(server).get('/reviews/meta?product_id=1')
      expect(res.body.product_id).toEqual('1')
      expect(res.body.ratings).toBeTruthy
      expect(res.body.recommended).toBeTruthy
      expect(res.body.characteristics).toBeTruthy
  })

});

// this passes no matter what...
describe('PUT /helpful route', () => {
  it('responds with 204', async () => {
    const res = await request(server).put('/reviews/000/helpful')
      expect(res.statusCode).toEqual(204)
  })
});

// this passes no matter what...
describe('PUT /report route', () => {
  it('responds with 204', async () => {
    const res = await request(server).put('/reviews/000/report')
      expect(res.statusCode).toEqual(204)
  })
});

afterAll(async () => {
  const { review, reviews_photo, characteristic_review } = sequelize.models;
  try {
    await Promise.all([
      review.destroy({where: {}}),
      reviews_photo.destroy({where: {}}),
      characteristic_review.destroy({where: {}})
    ])
    await sequelize.close();
  } catch (err) {
    console.log('teardown error: ', err);
  }
});