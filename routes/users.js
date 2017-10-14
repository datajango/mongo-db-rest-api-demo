const express = require('express');
const router = express.Router();
//const router = require('express-promise-router')();
const users_controller = require('../controllers/users');
const { validate_param, schemas }  = require('../helpers/route-helper');

router.get('/', users_controller.index);
router.get('/promise', users_controller.index_promise);
router.get('/async', users_controller.index_async);
router.post('/', users_controller.create_user);
router.post('/promise', users_controller.create_user_promise);
router.post('/async', users_controller.create_user_async);

router.route('/:userId')
    .get(validate_param(schemas.idSchema, 'userId'), users_controller.getUser)
    .put(users_controller.replaceUser)
    .patch(users_controller.updateUser);

//router.get('/:userId', validate_param(schemas.idSchema, 'userid'), users_controller.getUser);
//router.put('/:userId', users_controller.replaceUser);
//router.patch('/:userId', users_controller.updateUser);

router.get('/:userId/cars', users_controller.getUserCars);
router.post('/:userId/cars', users_controller.createUserCars);


//router.put('/:userId', users_controller.replaceUser);
//router.patch('/:userId', users_controller.updateUser);

//promise_router.route('/:userId')
//    .get(users_controller.getUser);

module.exports = router;