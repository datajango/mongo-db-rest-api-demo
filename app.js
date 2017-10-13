require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOOSE_CONN);

const app = express();

// Import routes modules
const users = require('./routes/users');

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());

// Routes
app.use('/users', users);

// Catch 440 Errors and forward them to an error handler 
app.use((req, res, next) => {
    //console.log(req);
    const err = new Error(`Route ${req.originalUrl} Not Found`);
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