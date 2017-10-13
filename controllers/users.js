const UserModel = require('../models/user');

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
};

