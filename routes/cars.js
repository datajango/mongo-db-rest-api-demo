const express = require('express');
const router = require('express-promise-router')();
const CarsController = require('../controllers/cars');
const { validate_param, validate_body, schemas}  = require('../helpers/route-helper');

router.route('/')
    .get(CarsController.index)
    .post(validate_body(schemas.carSchema),
           CarsController.addCar);

router.route('/:carId')
    .get(validate_param(schemas.idSchema, 'carId'),         
        CarsController.getCar)
    .patch(validate_param(schemas.idSchema, 'carId'),         
        validate_body(schemas.updateCarSchema),
        CarsController.updateCar)
    .put(validate_param(schemas.idSchema, 'carId'),         
        validate_body(schemas.putCarSchema),
        CarsController.replaceCar);
       
                  
module.exports = router;