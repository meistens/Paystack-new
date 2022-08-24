const request = require('supertest');
const app = require('./server');

describe('Payment API', () => {
   it('GET / --> Welcome Object', () => {
      request(app)
         .get('/')
         .expect('Content-Type', /json/)
         .expect(200)
         .then((response) => {
            expect(response.body).toEqual({})
         })
   });

   it('POST /init --> Object with authorization url and reference', () => {
      request(app)
         .get('/')
         .expect('Content-Type', /json/)
         .expect(200)
         .then((response) => {
            expect(response.body).toEqual({})
         })
   });

   it('GET /verify/reference --> Object for a successful transaction ', () => {

   });

   it('GET /list --> Object for all transactions carried out', () => {

   });

   it('GET /list/:id --> Welcome Object', () => {

   });

})