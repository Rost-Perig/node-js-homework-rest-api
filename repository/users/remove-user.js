import User from '../../models/user';

const removeUser = async (userId, isAdmin) => { 
    let result = null;  
    isAdmin && (result = await User.findByIdAndRemove(userId));
    return result;
};

export default removeUser;