const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations');

router.get('/', locationsController.getAllLocations);

module.exports = router; 