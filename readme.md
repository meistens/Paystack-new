# Paystack Payment Gateway with Axios

---

## Changes were made to this code. ~~It is still a work in progress but it definitely is coming together after some extensive reading of several docs (axios and formData)~~

## Completed

Unit tests and documenting soon. In the meantime, should you fork the repository, run this code below on your terminal

```javascript
node testfile.js
```

You should see some results as described [on Paystack](https://paystack.com/docs/api/)

Ignore the express setup, it is there in the event I or anyone on the team decides to consume the API.

### Added

- [x] Initialize transaction

- [x] Verify transaction (callback url not set, will not refirect properly after payment)

- [x] Fetch all transactions via the endpoint

- [x] Fetch a single transaction from the API endpoint

### Unit Tests Carried Out Via Jest and Manual Tests

- [x] Get form route

- [x] Error on fetching the wrong route

- [x] Initialize transaction

- [x] 400 on incomplete data while initializing a transaction

- [x] Verify transaction after submitting correct data

- [ ] Set callback url in the API

- [x] Fetch all transaction (effective if done with postman or any REST client of choice)

- [x] List a transaction (effective if done with postman or any REST client of choice)

### Note

All tests were carried out with Thunder Client. While the form is accessible via browser, other features like fetch all transactions and get the data of a single transaction are not easily accessible (by this, I mean no butrtons to get the data from the API).

Database has not been set up yet, purpose of this is to use [Jest](https://jestjs.io) for testing.

- [x] Unit tests

- [ ] Integration tests

### Troubleshooting

- Connection timeout (reset your router or switch off and on your internet connection)

- Typeerror|invalid_header despite your code looking alright (make sure you are in the directory where the file is, run the command on your terminal)
