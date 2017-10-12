require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const app = express();

// Middleware
app.use(logger());

// Routes

// Catch 440 Errors and forward them to an error handler 

// Error handler function


// Start tthe server
const port = app.get('port') || process.env.PORT || 4200;
//app.listen(port, ()=>console.log(`Server is listening on port $port(port).`));