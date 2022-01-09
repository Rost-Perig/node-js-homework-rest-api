import User from "../../models/user";

const findUserByEmail = async email => {
    return await User.findOne({email});
};

export default findUserByEmail;