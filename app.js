require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();

// Import routes modules
const users = require('./routes/users');

// Middleware
app.use(morgan('combined'));

// Routes
app.use('/users', users);

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

// Start tthe server
const port = app.get('port') || process.env.PORT || 4200;
app.listen(port, ()=>console.log(`Server is listening on port port ${port}.`));