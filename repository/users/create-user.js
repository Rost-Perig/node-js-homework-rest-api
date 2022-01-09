import User from "../../models/user";

const createUser = async (body) => {
    const user = new User(body); 
    const { id, name, email, role, subscription } = await user.save();
    return { id, name, email, role, subscription };
 };

export default createUser;


