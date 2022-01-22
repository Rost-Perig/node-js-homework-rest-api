import userService from '../../services/users/user-service';
import { httpCodes, Messages, Role } from '../../lib/constants';
import EmailService from '../../services/email/email-service';

class UserControllers {
    async getUsers(req, res, next) {
        const users = await userService.list(req.query); 
        res.status(httpCodes.OK).json({ status: 'success', code: httpCodes.OK, data: { ...users } });
    };
    
    async getUser(req, res, next) {
        let { id } = req.params;
        const { id: currentUserId } = req.user;
        (id === 'current') && (id = currentUserId);
        const isAdmin = (req.user.role === Role.ADMIN);
        const soughtUser = await userService.getById(id, currentUserId, isAdmin);
        if (!soughtUser) {
            return  res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: Messages.NOT_FOUND[req.app.get('lang')]});
        };
        const { name, email, role, subscription } = soughtUser;
        let result = null;
        isAdmin ?
            result = soughtUser :
            result = {name, email, role, subscription};
        res.status(httpCodes.OK).json({ status: 'success', code: httpCodes.OK, data: { result } });    
    };

    async delUser(req, res, next) {
        const { id } = req.params;
        const isAdmin = (req.user.role === Role.ADMIN); 
        const deletedUser = await userService.remove(id, isAdmin);
        deletedUser ?
            res.status(httpCodes.OK).json({status: 'success', code: httpCodes.OK, data: {deletedUser}}) :
            res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: Messages.NOT_FOUND[req.app.get('lang')] });
    };
    
    async putUser(req, res, next) {
        const { id } = req.params;  
        const updatedUser = await userService.update(id, req.body);
        updatedUser ?
            res.status(httpCodes.OK).json( {status: 'success', code: httpCodes.OK, message: req.body} ) :
            res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: Messages.NOT_FOUND[req.app.get('lang')]});
    };

    async verifyUser(req, res, next) {
        const verifyToken = req.params.token;
        const userFromToken = await userService.findByVerifyToken(verifyToken);
        if (userFromToken) {
            await userService.updateVerify(userFromToken.id, true);
            return res.status(httpCodes.OK).json({status: 'success', code: httpCodes.OK, data: { message: 'Success' }});
        }
        res.status(httpCodes.BAD_REQUEST).json({ status: 'success', code: httpCodes.BAD_REQUEST, data: { message: 'Invalid token' } });
    };

    /*resending email*/

    async repeatEmailForVerifyUser(req, res, next) {
        const { email } = req.body;
        const user = await userService.findByEmail(email);
        if (user) {
            const { email, name, verifyTokenEmail, isVerify } = user;
            if (isVerify) {
                return res.status(httpCodes.OK).json({ status: 'success', code: httpCodes.OK, data: { message: 'User verification was successful earlier' } }); //пользователь успешно подтвержден ранее
            };
            const emailService = new EmailService(process.env.NODE_ENV);
            const isSend = await emailService.sendVerifyEmail(email, name, verifyTokenEmail);
            if (isSend) {
            return res.status(httpCodes.OK).json({status: 'success', code: httpCodes.OK, data: { message: 'Success' }})
            };
            return res.status(httpCodes.UE).json({  status: 'error', code: httpCodes.UE, data: { message: 'Unprocessable Entity' } })
        };
        res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, data: { message: 'User with email not found' } });
    };
};

const userControllers = new UserControllers;

export default userControllers;