import User from '../../models/user';

const listUsers = async ({ sortBy, sortByDesc }) => {
     let sortCriteria = null;
    sortBy && (sortCriteria = { [`${sortBy}`]: 1 }); 
    sortByDesc && (sortCriteria = { [`${sortByDesc}`]: -1 }); 
    const total = await User.find().countDocuments();
    const result = await User.find().sort(sortCriteria);
    // result = result.sort(sortCriteria);

    return { total, users: result };
};

export default listUsers;