const express = require('express');
const router = express.Router();
const promise_router = require('express-promise-router')();
const users_controller = require('../controllers/users');

router.get('/', users_controller.index);
router.get('/promise', users_controller.index_promise);
router.get('/async', users_controller.index_async);
router.post('/', users_controller.create_user);
router.post('/promise', users_controller.create_user_promise);
router.post('/async', users_controller.create_user_async);

router.get('/:userId', users_controller.getUser);
router.put('/:userId', users_controller.replaceUser);
router.patch('/:userId', users_controller.updateUser);

router.get('/:userId/cars', users_controller.getUserCars);
router.post('/:userId/cars', users_controller.createUserCars);

//router.put('/:userId', users_controller.replaceUser);
//router.patch('/:userId', users_controller.updateUser);

//promise_router.route('/:userId')
//    .get(users_controller.getUser);

module.exports = router;