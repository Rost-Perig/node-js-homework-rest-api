import User from "../../models/user";

const findUserById = async (id)=> {
    return await User.findById(id);
};

export default findUserById;