# mongo-db-rest-api-demo
My version  of the CodeWorkr Express Mongdb REST API Series

# Setup a MongoDB

1. goto [MLab](https://mlab.com/) and setup a databases called cars.
1. create an admin user.

## Step 1

1. npm init -y
1. yarn add express
1. create app.js
1. add .gitignore
1. add .jshintrc

## Step 2: Add .env

1. npm install dotenv --save
1. create .env
1. I am not adding it to git repo, look at .env.sample

## Step 3: Add Logger

**Morgan** : HTTP request logger middleware for node.js

* [Morgan](https://www.npmjs.com/package/morgan)
* [GitHub](https://github.com/expressjs/morgan)

1. yarn add morgan
1. add as middleware

app.use(logger('dev));

## Step 4: Add 404 Handler

```javascript
// Catch 440 Errors and forward them to an error handler 
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    // Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    // Respond to ourselves
    console.error(err);
});
```

## Step 5: Add first route

1. Add route
1. Launch server
    * node app.js
1. Launch Postman
    1. Create a New Collection
    ![Create a new Collection](/docs/postman-step1.PNG)
    1. https://www.getpostman.com/collections/6b847ee739a8d9cf6c951
    1. Send Get Request
    ![Get Request](/docs/postman-get-index.PNG)
    1. Success!

## Step 6. Create Folders

1. Create helpers folders
1. Create controllers folders
1. Create models folders

## Step 7. Install Nodemon

1. yarn add nodemon
1. add "start" command to package.json
1. npm start

## Step 8. Add Routes and Controllers

1. create routes/user.js
1. refactor app.js to use the user route module
1. create controllers/user.js
1. refactor routes/users.js to use the user controller module

## Step 9. Mongoose

* [NPM](https://www.npmjs.com/package/mongoose)
* [GitHub](https://github.com/Automattic/mongoose1)
* [MongooseJS](http://mongoosejs.com/)

1. yarn add mongoose
1. We can interact with mongoose in 3 different ways:
    1. Callbacks
    1. Promises
    1. Async/Await (Promises)

## Step 10. Add POST Route

* [NPM body-parser](https://www.npmjs.com/package/body-parser)

1. yarn npm body-parser
1. add body-parser as Middleware
    * app.use(bodyParser.json());
1. add users.post route
1. add users.create_usrer controller
1. In Postman, make sure to add Headers
    * Content-Type:application/json

## Step 11. Added db/seed.js

1. The seed-db function will populate the mongodb database with starting values.

## Step 12. Convert to Promise

1. Refactored controller/users.js to use a Promise

1. Fixed depricated error in app.js
    * mongoose.Promise = global.Promise;

## Step 13. Make nodemon a devdependency.

1. yarn add --dev nodemon

## Step 14. Convert to Async/Await

1. Refactored controller/users.js to use Async/Await

## Step 15. Install Express-Promise-Router

1. yarn add express-promise-router

## Making it Async

so... async/await doesn't actually make Node.js code synchronous.
what it does do is allow you not have to write callbacks or Promise().then().catch() functions
so it makes your code verbose

* [here is a pretty good guide](http://thecodebarbarian.com/80-20-guide-to-async-await-in-node.js.html)
* [here is a good example of how it all works*](https://gist.github.com/license2e/04a787e9e1c0d2d0cfe23797ddaafbbc)

so it will queue up all the calls in order, but some the async processing will return before others depending on how quickly it is processed
More links
* [using-async-await-with-a-foreach-loop](https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop)
* [make-async-await-loop-execute-in-order](https://stackoverflow.com/questions/35632531/make-async-await-loop-execute-in-order)

also, updated example git with file write output

## Step 16. Adding more routes

1. extend routes in routes/users.js, controllers/users.js
1. now we have a cars route
```json
{
    "cars": [
        {
            "_id": "59e0d615fcdd4965849e4466",
            "seller": "59e011151dc47a3a34f79440",
            "make": "Ford",
            "model": "Flex",
            "year": 2017,
            "price": 39000,
            "__v": 0
        },
        {
            "_id": "59e0d64feed04e6e80cc7d4a",
            "seller": "59e011151dc47a3a34f79440",
            "make": "Ford",
            "model": "Flex",
            "year": 2017,
            "price": 39000,
            "__v": 0
        }
    ]
}
```

## Step 17. Validation

* [express validator](https://www.npmjs.com/package/express-validator)
* [joi](https://www.npmjs.com/package/joi)
    * Object schema description language and validator for JavaScript objects.
    * npm install --save joi
* [validator](https://www.npmjs.com/package/validator)
* [node validator](https://www.npmjs.com/package/node-validator)
* [better validator](https://www.npmjs.com/package/better-validator)
    * be simple to use
    * support a number of usage patterns including a fluent interface
    * support re-use of validator parts
    * support deep object and array validation
    * be able to customise the output structure
    * be able to customise failure messages
    * support i18n
    * use the well known validator library for string validation
    * be easily used with both express.js, koa.js and koa@next
    * written in and works with typescript (>= v2.0.0, see Section on Breaking Changes below)

1. Go with Joi
1. npm install --save joi
