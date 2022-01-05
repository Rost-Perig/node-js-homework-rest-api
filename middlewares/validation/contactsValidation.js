import Joi from 'joi';
import mongoose from 'mongoose';
import { httpCodes, Messages } from '../../lib/constants';
  
const { Types } = mongoose;

const createSchema = Joi.object({
    name: Joi.string().required().min(3).max(30), 
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().optional()
});

const updateSchema = Joi.object({
    name: Joi.string().optional().min(3).max(30), 
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    favorite: Joi.boolean().optional()
}).or('name', 'email', 'phone', 'favorite'); 

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
}); 

const regLimit = /\d+/; 

const querySchema = Joi.object({
    limit: Joi.string().pattern(regLimit).optional(),
    skip: Joi.string().pattern(regLimit).optional(),
    page: Joi.string().pattern(regLimit).optional(),
    sortBy: Joi.string().optional().valid('name', 'phone', 'email'),
    sortByDesc: Joi.string().optional().valid('name', 'phone', 'email'),
    filter: Joi.string().optional().pattern(new RegExp(`(name|email|phone)\\|?(name|email|phone)+`)),
    favorite: Joi.boolean().optional()
}); 


export const validateCreate = async (req, res, next) => {
    try {
        await createSchema.validateAsync(req.body);
    }
    catch (err) {
        return res.status(httpCodes.BAD_REQUEST).json({ status: 'error', code: httpCodes.BAD_REQUEST, message: `Field ${err.message.replace(/"/g, '')}`});
    };
    next();
};

export const validateUpdate = async (req, res, next) => {
    try {
        await updateSchema.validateAsync(req.body);
    }
    catch (err) {
        const [{ type }] = err.details;
        if (type === 'object.missing') {
            return res.status(httpCodes.BAD_REQUEST).json({ status: 'error', code: httpCodes.BAD_REQUEST, message: Messages.MISSING_FIELDS[req.app.get('lang')] });
        };
        return res.status(httpCodes.BAD_REQUEST).json({ status: 'error', code: httpCodes.BAD_REQUEST, message: err.message.replace(/"/g, '')});
    };
    next(); 
};

export const validateUpdateFavorite = async (req, res, next) => {
    try {
        await updateFavoriteSchema.validateAsync(req.body);
    }
    catch (err) {
        const [{ type }] = err.details;
        if (type === 'object.missing') {
            return res.status(httpCodes.BAD_REQUEST).json({ status: 'error', code: httpCodes.BAD_REQUEST, message: Messages.MISSING_FIELDS[req.app.get('lang')] });
        };
        return res.status(httpCodes.BAD_REQUEST).json({ status: 'error', code: httpCodes.BAD_REQUEST, message: err.message.replace(/"/g, '')});
    };
    next(); 
 };

export const validateId = async (req, res, next) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(httpCodes.BAD_REQUEST).json({ status: 'error', code: httpCodes.BAD_REQUEST, message: Messages.BAD_REQUEST[req.app.get('lang')] });
    };
    next();
};

export const validateQuery = async (req, res, next) => {
    try {
        await querySchema.validateAsync(req.query);
    }
    catch (err) {
        return res.status(httpCodes.BAD_REQUEST).json({ status: 'error', code: httpCodes.BAD_REQUEST, message: `Field ${err.message.replace(/"/g, '')}`});
    };
    next();
};





