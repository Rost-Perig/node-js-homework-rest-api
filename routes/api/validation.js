/*используем для валидации  joi */

import res from 'express/lib/response';
import Joi from 'joi';

const createSchema = Joi.object({
    name: Joi.string() 
        .required() 
        .min(3)
        .max(30), 
    email: Joi.string()
        .email()
        .required(),
    phone: Joi.string()
        .required()
});

const updateSchema = Joi.object({
    name: Joi.string() 
        .optional() 
        .min(3)
        .max(30), 
    email: Joi.string()
        .email()
        .optional(),
    phone: Joi.string()
        .optional()
}).or('name', 'email', 'phone'); 

const idSchema = Joi.object({
    id: Joi.string()
        .required()
});

export const validateCreate = async (req, res, next) => {
    try {
        const value = await createSchema.validateAsync(req.body);
    }
    catch (err) {
        return res.status(400).json({ message: `Field ${err.message.replace(/"/g, '')}` });
    };
    next();
};

export const validateUpdate = async (req, res, next) => {
    try {
        const value = await updateSchema.validateAsync(req.body);
    }
    catch (err) {
        // console.log(err.details) //Пример ковыряния в ошибках... Выведет в консоли: {message: '"nick" is not allowed', path: [ 'nick' ],type: 'object.unknown',context: { child: 'nick', label: 'nick', value: 'ro', key: 'nick' }}. Теперь определяем тип ошибки (в документации joi они все расписаны) и пишем дальнейшую логику (можно так под каждую... Можно свичем):
        const [{ type }] = err.details;
        if (type === 'object.unknown') {
            return res.status(400).json({ message: err.message.replace(/"/g, '') });
        };
        return res.status(400).json({ message: 'missing field' });
    };
    next(); 
};

export const validateId = async (req, res, next) => {
    try {
        const value = await idSchema.validateAsync(req.params);
    }
    catch (err) {
        return res.status(400).json({ message: `${err.message.replace(/"/g, '')}` });
    };
    next();
};



