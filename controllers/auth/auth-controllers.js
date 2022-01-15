import { httpCodes, Messages } from '../../lib/constants';
import userService from '../../services/users/user-service';
import authService from '../../services/auth/auth-service';

class AuthControllers {

    async registration(req, res, next) {
        try {
            const { email } = req.body;
            const isSuchUserExist = await authService.isUserExist(email);
            if (isSuchUserExist) {
                return res.status(httpCodes.CONFLICT).json({ status: 'error', code: httpCodes.CONFLICT, message: Messages.CONFLICT[req.app.get('lang')] });
            };
            const data = await userService.create(req.body);
            res.status(httpCodes.CREATED).json({ status: 'success', code: httpCodes.CREATED, data });
        } catch (err) {
            next(err)
        }; 
    };

    async login(req, res, next) {
        try {
            const { email, password } = req.body; 
            const user = await authService.getUser(email, password); 

            if (!user) {
                return res.status(httpCodes.UNAUTHORIZED).json({ status: 'error', code: httpCodes.UNAUTHORIZED, message: Messages.UNAUTHORIZED[req.app.get('lang')] });
            };
            const token = authService.getToken(user); 
            await authService.updateToken(user.id, token); 
            res.status(httpCodes.OK).json({ status: 'success', code: httpCodes.OK, data: { token } });
        } catch (err) {
            next(err)
        };
        
    };

    async logout(req, res, next) {
        try {
            await authService.updateToken(req.user.id, null);
            res.status(httpCodes.NO_CONTENT).json({ status: 'success', code: httpCodes.NO_CONTENT, data: {} });
        } catch (err) {
            next(err)
        }; 
    };
};

const authControllers = new AuthControllers;

export default authControllers;