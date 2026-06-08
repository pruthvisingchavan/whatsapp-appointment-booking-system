const express = require('express');

const router = express.Router();

const appointmentController = require(
  '../controllers/appointmentController'
);

const apiKeyAuth = require(
  '../middlewares/apiKeyAuth'
);

router.post(
  '/',
  apiKeyAuth,
  appointmentController.create
);

router.get(
  '/',
  apiKeyAuth,
  appointmentController.getAll
);

router.put(
  '/:referenceId',
  apiKeyAuth,
  appointmentController.update
);

router.delete(
  '/:referenceId',
  apiKeyAuth,
  appointmentController.remove
);

module.exports = router;