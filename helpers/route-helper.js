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
    
    schemas : {
        idSchema: Joi.object().keys({
            // userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })        
    }    
}

