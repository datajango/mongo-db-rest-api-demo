const express = require('express');
const router = express.Router();
const users_controller = require('../controllers/users');

router.get('/', users_controller.index);
router.get('/promise', users_controller.index_promise);
router.post('/', users_controller.create_user);
router.post('/promise', users_controller.create_user_promise);

module.exports = router;