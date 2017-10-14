const Joi = require('joi');


module.exports = {
    validate_param : (schema, name) => {
        return (req, res, next) => {
            console.log(`validate_param: req.params[${name}]:`, req.params[name]);

            const result = Joi.validate({param: req['params'][name]}, schema);

            if (result.error) {
                // Error happened
                console.log('validation error'); 
                return res.status(400).json(result.error);
            } else {
                if (!req.value) {
                    req.value = {};
                }
                if (!req.value['params']) {
                    req.value['params'] = {};
                }
                req.value['params'][name] = result.value.param;
                next();
            }            
        }
    },
    validate_body: (schema) => {
        return(req, res, next) => {
            const result = Joi.validate(req.body, schema);

            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value) {
                    req.value = {};
                }
                if (!req.value['body']) {
                    req.value['body'] = {};
                }
                req.value['body'] = result.value;
                next();
            }
        }
    },
    schemas : {
        userSchema: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required()
        }),
        userPatchSchema: Joi.object().keys({
            firstName: Joi.string(),
            lastName: Joi.string(),
            email: Joi.string().email()
        }),
        idSchema: Joi.object().keys({
            // userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        userCarSchema: Joi.object().keys({
            make: Joi.string().required(),
            model: Joi.string().required(),
            year: Joi.number().required(),
            price: Joi.number().required()
        }),       
        carSchema: Joi.object().keys({
            seller: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            make: Joi.string().required(),
            model: Joi.string().required(),
            year: Joi.number().required(),
            price: Joi.number().required()
        }),    
        putCarSchema: Joi.object().keys({            
            make: Joi.string().required(),
            model: Joi.string().required(),
            year: Joi.number().required(),
            price: Joi.number().required()
        }),            
        patchCarSchema: Joi.object().keys({            
            make: Joi.string(),
            model: Joi.string(),
            year: Joi.number(),
            price: Joi.number()
        }),       
    }    
}

