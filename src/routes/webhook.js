const express = require('express');

const router = express.Router();

const whatsappController = require('../controllers/whatsappController');



/*
==================================================
WHATSAPP WEBHOOK ROUTE
==================================================
*/

router.post(

    '/',

    whatsappController.receiveMessage
);




/*
==================================================
EXPORT ROUTER
==================================================
*/

module.exports = router;