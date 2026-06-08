require('dotenv').config();

const express = require('express');

const cors = require('cors');

const morgan = require('morgan');



/*
==================================================
IMPORT ROUTES
==================================================
*/

const appointmentsRoute = require('./routes/appointments');

const webhookRoute = require('./routes/webhook');

const healthRoute = require('./routes/health');



/*
==================================================
IMPORT MIDDLEWARES
==================================================
*/

const rateLimiter = require('./middlewares/rateLimiter');

const errorHandler = require('./middlewares/errorHandler');



/*
==================================================
CREATE EXPRESS APP
==================================================
*/

const app = express();



/*
==================================================
GLOBAL MIDDLEWARES
==================================================
*/

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));



/*
==================================================
RATE LIMITER
==================================================
*/

if (typeof rateLimiter === 'function') {

    app.use(rateLimiter);
}



/*
==================================================
ROUTES
==================================================
*/

app.use('/api/appointments', appointmentsRoute);

app.use('/webhook', webhookRoute);

app.use('/health', healthRoute);



/*
==================================================
ERROR HANDLER
==================================================
*/

if (typeof errorHandler === 'function') {

    app.use(errorHandler);
}



/*
==================================================
EXPORT APP
==================================================
*/

module.exports = app;