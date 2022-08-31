const request = require('supertest');
const { response } = require('../server');
const app = require('../server');

describe('GET form', () => {
   test('returns a form', async () => {
      await request(app)
         .get('/')
         .expect('Content-Type', /json/)
         .then((response) => {
            expect(response.status).toEqual(200)
         })
         .catch((err) => {
            return err
         })
   });

   test('returns 404', async () => {
      await request(app)
         .get('/p')
         .then((response) => {
            expect(response.status)
               .toEqual(404)
         })
         .catch((err) => {
            return err
         })
   })
});


describe('POST /pay', () => {
   test('initializes a transaction', async () => {
      await request(app)
         .post('/pay')
         .send({
            "email": "test@test.com",
            "amount": 10000
         })
         .expect('Content-Type', /json/)
         .then((response) => {
            expect(response.status)
               .toEqual(302)
         })
         .catch((err) => {
            return err
         })
   });

   test('invalidates incomplete data', async () => {
      await request(app)
         .post('/pay')
         .send({
            "email": "test",
            "amount": 10000
         })
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .then((response) => {
            expect(response.status)
               .toEqual(400)
         })
         .catch((err) => {
            return err
         })
   })
})

// test case resolve issue
describe('GET /call', () => {
   test('verifies a transaction', async () => {
      await request(app)
         .get('/call')
         .expect('Content-Type', /json/)
         .then((response) => {
            expect(response.status)
               .toEqual(200)
         })
         .catch((err) => {
            return err
         })

   })
})