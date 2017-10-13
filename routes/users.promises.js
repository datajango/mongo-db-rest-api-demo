const express = require('express');
//const router = express.Router();
const router = require('express-promise-router');
const users_controller = require('../controllers/users');

router.get('/', users_controller.index);
router.get('/promise', users_controller.index_promise);
router.get('/async', users_controller.index_async);
router.post('/', users_controller.create_user);
router.post('/promise', users_controller.create_user_promise);
router.post('/async', users_controller.create_user_async);

module.exports = router;