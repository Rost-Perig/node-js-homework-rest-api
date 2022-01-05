import User from '../../models/user';

const getUserById = async (userId, currentUserId, isAdmin) => {  
    let result = null;
    isAdmin ?
        result = await User.findById({ _id: userId }) :
        result = await User.findOne({ _id: currentUserId })
    return result;
};

export default getUserById;