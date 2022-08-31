const request = require('supertest');
const app = require('../server');

describe('GET form', () => {
   test('returns a form', () => {
      request(app)
         .get('/')
         .expect('Content-Type', /json/)
         .then((response) => {
            expect(response.status).toEqual(200)
         })
         .catch((err) => {
            return err
         })
   });

   test('returns 404', () => {
      request(app)
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
   test('initializes a transaction', () => {
      request(app)
         .post('/pay')
         .send({
            "email": "test@test.com",
            "amount": 10000
         })
         .expect('Content-Type', 'text/plain; charset=utf-8')
         .then((response) => {
            expect(response.status)
               .toEqual(302)
         })
         .catch((err) => {
            return err
         })
      // .end((err, res) => {
      //    if (err) return done(err)
      //    return done()
      // })
   });

   test('invalidates incomplete data', (done) => {
      request(app)
         .post('/pay')
         .send({
            "email": "test",
            "amount": 10000
         })
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(400)
         .end((err, res) => {
            if (err) return done(err)
            return done()
         })

   })
})

describe('GET /callback', () => {
   test('verifies a transaction', () => {

   })
})