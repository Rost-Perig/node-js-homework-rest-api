import jwt from 'jsonwebtoken';
import findUserById from '../repository/users/find-user-by-id';
import {httpCodes, Messages} from '../lib/constants';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, SECRET_KEY);
        return !!verify;
    } catch (e) {
        return false
    };
};

const guard = async (req, res, next) => {
    const token = req.get('authorization')?.split(' ')[1];
    const isValidToken = verifyToken(token);
    if (!isValidToken) {
        return res.status(httpCodes.UNAUTHORIZED).json({ status: 'error', code: httpCodes.UNAUTHORIZED, message: Messages.NOT_AUTHORIZED[req.app.get('lang')] });
    };
    
    const payload = jwt.decode(token);
    const user = await findUserById(payload.id); 
    if (!user || user.token !== token) {
        return res.status(httpCodes.UNAUTHORIZED).json({ status: 'error', code: httpCodes.UNAUTHORIZED, message: Messages.NOT_AUTHORIZED[req.app.get('lang')] });
    };
    req.user = user; 
    next();
};

export default guard;