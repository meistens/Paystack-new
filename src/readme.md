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

- Initialize transaction

- Verify transaction

- Fetch all transactions via the endpoint

- Fetch a single transaction from the API endpoint

### Troubleshooting

- Connection timeout (reset your router or switch off and on your internet connection)

<!-- ## Description

Step by step guide on how to integrate paystack on your app.

### Prerequsites

1. Install Express, Mongoose, ejs, axios, form-data

Note: some of the installed module like form-data for use on the backend alone

``` javascript
npm i express
```

``` javascript
npm i dotenv
```

``` javascript
npm i mongoose
```

``` javascript
npm i ejs
```

``` javascript
npm i axios
```

``` javascript
npm i lodash
```

``` javascript
npm i body-parser
```

``` javascript
npm i form-data
```

1. Created a config folder for the mongoose server to the local mongodb database, exported the connection.

2. Created a models folder, with the payments model file for the form to be used as payment (said form will be set up in the views folder).
2.1 Prior to this, paystack needs only email and amount to initialize the api but other fields are saved on the database, like the reference and others, will add to the schema if there will be any features to add
p.s: client-side validation with joi will  be addedto the schema for further security

3. Time to build the paystack payment module. The way the module is built is to allow for one to add other payment modules as well, though it feels quite unnecessary as most popular platforms use a well-documented library.

Axios, which is an http library is used for handling the http request for this api and since request has been deprecated, time for an upgrade

#### Paystack Module Workings

1. The function is created, with axios as the argument

1. Secret key is passed  into the functon, which will be used in later functions

1. Create a function called initializeTx to initialize payment. For now, the data is hardcoded, will update when it is being passed to a server and consumed

1. The verifyTx function will use the same code as with the initialize payment with some changes

<!-- 1. Head over to your index file and create an express server, making sure to require the necessary packages to use.

1. Split your code into several files and folders using the MVC approach. The routes folder will contain the  routes, which will be exported for use to the index/express application, the most work will be in the controllers folder.

The following applications and libraries will be needed;

1. Axios - This package is for making HTTP request to the endpoint

1. Paystack Module - It is required. Do note that Axios comes before the wrapper or it will throw an error

1. Lodash - Lodash for selecting specific properties in the request body without writing long lines of code to get to the property to use.

1. The payment model is imported.

1. Set up your ejs file to render a form. For styling, create a public folder for holding static files (HTML, CSS, Javascript).
*Note* - The form submits to paystack/pay which means a POST route has to be created

 The POST route steps below

   1. The lodash object function pick() is used to select some of the fields (email, amount, full_name) from the body that was sent in the post request from the form submission.

``` javascript
const form = _.pick(req.body, ['full_name', 'email', 'amount']);
```

1. Reading Paystack API docs, it accepts email and amount for a once off payment, but provides another property to store our own defined properties for the payment transaction: **metadata property.**

1. Next we reassign the full_name to the metadata property of the form object to help secure the name on paystack.

``` javascript
form.metadata = {
      full_name: form.full_name
   }
   ```

   The next thing we do is to convert the amount to kobo as paystack only accepts values in kobo.

   ``` javascript
   form.amount *= 100;
   ```

   Finally, the initPayment() is called, passing in the form object and call back as we defined earlier in the paystack module.

If no error it converts the body of the response to a JavaScript object using the JSON.parse().

We then pick the authorization_url sent back by paystack and redirect the payer to paystack to enter payment details; calling redirect on the app response object.

After the donor’s interaction with paystack, the donor is redirected back to our application. In order to handle this, paystack gives us the privilege to set the callback url after interaction with it. We can set this in our paystack dashboard. Head on to paystack and go to settings, then to the API keys and Webhook tab.

### Tests Done

1. GET route to render the ejs form - successful

### Errors Encountered

1. ejs not properly served fix

``` javascript
app.set('view engine', 'ejs');
```

Don't forget to use 'ejs'. -->
