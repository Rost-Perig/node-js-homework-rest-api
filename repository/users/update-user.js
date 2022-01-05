import User from "../../models/user";

const updateUserById = async (id, body )=> {
    return await User.findByIdAndUpdate(id, {...body }, {new: true});
};

export default updateUserById;