const mongoose = require('mongoose');
const UserModel = require('../models/user');
const CarModel = require('../models/car');

module.exports = {
    index: (req, res, next) => {
        UserModel.find({}, (err, users) => {            
            if (err) 
            {
                //console.log('err', err);
                next(err);                
            }
            console.log(`index Found ${users.length} users`);
            res.status(200).json({users});            
        });
    },

    index_promise: (req, res, next) => {
                
        UserModel.find({})
            .then(users => {
                // Do something with the users here...
                console.log(`index_promise Found ${users.length} users`);
                res.status(200).json({users});                    
            })
            .catch(err => {
                next(err);
            });
    },

    index_async: async (req, res, next) => {
        try {
            const users = await UserModel.find({});
            //throw new Error('test error');
            res.status(200).json({users});            
        } catch(err) {
            next(err);
        }        
    },

    create_user: (req, res, next) => {        
        console.log('req.body contents', req.body);
        const new_user = new UserModel(req.body);
        console.log(new_user);
        new_user.save((err, user)=>{
            if (err) {
                console.log(err);
            } else {
                console.log(user);
                res.status(201).json(user);
            }
        });        
    },   
    
    create_user_promise: (req, res, next) => {                
        const new_user = new UserModel(req.body);        
        new_user.save()
            .then(user => {
                console.log(user);
                res.status(201).json(user);
            })
            .catch(err => {
                next(err);
            });
    },       

    create_user_async: async (req, res, next) => {
        try {
            const new_user = new UserModel(req.body);        
            const user = await new_user.save();
            res.status(201).json(user);    
        } catch(err) {
            next(err);            
        }
    },         
    
    getUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            
            const user = await UserModel.findById({userId});        
            
            res.status(200).json({user});        
        } catch(err) {
            next(err);            
        }
    },        
    
    // enforce that every field is provided
    replaceUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const newUser = req.body;            
            console.log('userId is',userId);            
            console.log('newUser is', newUser);
            const result = await UserModel.findByIdAndUpdate(userId, newUser);
            console.log('result is', result);
            res.status(200).json({success:true});        
        } catch(err) {
            next(err);            
        }
    },        
    
    // any combination of fields
    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const newUser = req.body;            
            console.log('userId is',userId);            
            console.log('newUser is', newUser);
            const result = await UserModel.findByIdAndUpdate(userId, newUser);
            console.log('result is', result);
            res.status(200).json({success:true});         
        } catch(err) {
            next(err);            
        }
    },

    getUserCars: async (req, res, next) => {
        try {
            const { userId } = req.params;
            
            const user = await UserModel.findById(userId).populate('cars');        
            
            console.log("users's car", user.cars);

            res.status(200).json({cars:user.cars});        
        } catch(err) {
            next(err);            
        }
    },      
    
    createUserCars: async (req, res, next) => {
        try {
            // Get the userId
            const userId = req.params.userId;
            console.log(userId, typeof(userId));

            // Create a new car
            const newCar = new CarModel(req.body);
            
            console.log('userId', userId);
            console.log('newCar', newCar);
                        
            const user = await UserModel.findById(userId);
            
            // assign user as a car's seller
            newCar.seller = user;

            // Save the car
            await newCar.save();

            // Add car to the user's selling array of cars
            user.cars.push(newCar);

            // Save the user
            await user.save();
                        
            res.status(200).json({newCar});
            //res.status(200).json({status:true});
        } catch(err) {
            next(err);            
        }
    },      
};

