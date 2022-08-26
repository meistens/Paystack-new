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
})


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
})

describe('GET /callback', () => {
   it('verifies a transaction', () => {

})
})