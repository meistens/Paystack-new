const request = require('supertest');
const app = require('../server');

describe('GET /pay', () => {
   it('returns an object', () => {
      request(app)
         .get('/pay')
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(200)
         .then((response) => {
            expect(response.body).toEqual({})
         })
         .catch((err) => {
            err
         })
   });

   it('returns 404', () => {
      request(app)
         .get('/p')
         .expect(404)
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
   it('initializes a transaction', (done) => {
      request(app)
         .post('/pay')
         .send({
            "email": "test@test.com",
            "amount": 10000
         })
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(200)
         .end((err, res) => {
            if (err) return done(err)
            return done()
         })
   });

   it('invalidates incomplete data', (done) => {
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
   it('verifies a transaction', () => {

   })
})