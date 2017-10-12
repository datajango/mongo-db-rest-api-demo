# mongo-db-rest-api-demo
My version  of the CodeWorkr Express Mongdb REST API Series

# Setup a MongoDB

1. goto [MLab](https://mlab.com/) and setup a databases called cars.
2. create an admin user.

# Step 1

1. npm init -y
2. yarn add express
3. create app.js
4. add .gitignore
5. add .jshintrc

# Step 2: Add .env

1. npm install dotenv --save
2. create .env
3. I am not adding it to git repo, look at .env.sample

# Step 3: Add Logger

** Morgan ** : HTTP request logger middleware for node.js
[Morgan](https://www.npmjs.com/package/morgan)
[GitHub](https://github.com/expressjs/morgan)

1. yarn add morgan
2. add as middleware

app.use(logger('dev));

# Step 4: Add 404 Handler

```

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

