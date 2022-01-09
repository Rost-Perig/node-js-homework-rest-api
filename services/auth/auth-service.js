import jwt from 'jsonwebtoken';
// import updateToken from '../../repository/users/update-token';
import User from "../../models/user";
import findUserByEmail from '../../repository/users/find-user-by-email';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
    async isUserExist(email) {
        const user = await findUserByEmail(email);
        return !!user;
    };

    async getUser(email, password) {
        const user = await findUserByEmail(email);
        const isValidPass = await user?.isValidPassword(password);
        if (!isValidPass) {
            return null;
        };
        return user;
    };

    getToken(user) {
        const id = user.id;
        const payload = { id }; 
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '12h'}); 
        return token;
    };

    async setToken(id, token) {
        await this.updateToken(id, token);
    };

    async updateToken(id, token) {
        return await User.updateOne({_id:id}, {token});
    };
};
 
const authService = new AuthService;

export default authService;