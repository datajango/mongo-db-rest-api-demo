const express = require('express');
const router = express.Router();
const users_controller = require('../controllers/users');

router.get('/', users_controller.index);

module.exports = router;