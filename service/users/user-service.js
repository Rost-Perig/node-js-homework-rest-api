import User from '../../models/user';
import createUser from '../../repository/users/create-user';

class UserService {
    async create(body) {
        return await createUser(body);
    }

    async updateUser(userId, body) {
        const result = await User.findByIdAndUpdate(
            userId,
            { ...body },
            { new: true }
        );
        return result;
    }
 };

export default UserService;