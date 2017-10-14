const mongoose = require('mongoose');
const UserModel = require('../models/user');
const CarModel = require('../models/car');

module.exports = {
    index: async (req, res, next) => {
        const cars = await CarModel.find({});            
        res.status(200).json({cars});            
    },
    addCar: async (req, res, next) => {
        // 1. Find the the actual seller
        const seller = await UserModel.findById(req.value.body.seller);

        // 2. Create a new car
        const newCar = req.value.body;
        delete newCar.seller;
        const car = new CarModel(newCar);
        await car.save();

        // 3. Add newly created car to the actual seller
        seller.cars.push(car);
        
        await seller.save();
        
        res.status(200).json({car});
    },
    getCar: async (req, res, next) => {    
        const { carId } = req.value.params;
        console.log('getCar', carId);   
        const car = await CarModel.findById(carId);
        res.status(200).json({car});
    },
    replaceCar: async (req, res, next) => {    
        const { carId } = req.value.params;
        const newCar = req.value.body;            
        const result = await CarModel.findByIdAndUpdate(carId, newCar);
        res.status(200).json({success:true});
    },
    updateCar: async (req, res, next) => {
        const { carId } = req.value.params;
        const newCar = req.value.body;            
        const result = await UserModel.findByIdAndUpdate(carId, newCar);
        res.status(200).json(result);         
    }
};