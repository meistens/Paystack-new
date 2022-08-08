# Paystack Payment Gateway Documentation

## Description

Step by step guide on how to integrate paystack on your app.

### Prerequsites

1. Install Express, Mongoose, ejs, axios

``` javascript
npm i express
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

1. Created a config folder for the mongoose server to the local mongodb database, exported the connection.

1. Created a models folder, with the payments model file for the form to be used as payment (said form will be set up in the views folder).
2.1 Prior to this, paystack needs only email and amount to initialize the api but other fields are saved on the database, like the reference and others, will add to the schema if there will be any features to add
p.s: client-side validation with joi will  be addedto the schema for further security

1. Time to build the paystack payment module. The way the module is built is to allow for one to add other payment modules as well, though it feels quite unnecessary as most popular platforms use a well-documented library.

Axios, which is an http library is used for handling the http request for this api and since request has been deprecated, time for an upgrade

#### Paystack Module Workings

1. The function is created, with axios as the argument

1. Secret key is passed  into the functon, which will be used in later functions

1. Create a function to initialize payment, passing two arguments, the latter being the callback. The headers are written down, with the form object which was added as one of the arguments passed.
The callback gets 3 arguments:
i. Error when applicable,
ii. The response object and
iii. The response body
All our call back does is return the callback function (callBack) passed into the initPayment passing in the error and body from the request. callback would be well defined to run after initPayment runs whenever it is called. Axios is called to initialze a POST request, passing the form object and callBack.
Just a little highlight on its usage. Whenever initPayment() is called, it expects the form object to be passed in as the first argument and a callback function as the second. The callback function should expect two arguments too: error where applicable and body.

1. The verifyPayment function, a reference object that will most likely to be sent
but other than that, it is no different from the initPayment module.
