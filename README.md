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

