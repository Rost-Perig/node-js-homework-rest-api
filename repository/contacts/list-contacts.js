import Contact from '../../models/contact';

const listContacts = async (userId, { 
        sortBy, 
        sortByDesc, 
        page = 1,
        filter,
        limit = 12,
        favorite
}, isAdmin) => {
    
    let sortCriteria = null;
    let total = await Contact.find({ owner: userId }).countDocuments();
    isAdmin && (total = await Contact.find().countDocuments());
    let result = null;
    isAdmin ?
        result = Contact.find().populate({ path: 'owner', select: 'name email  role subscription' }) :
        result = Contact.find({ owner: userId }).populate({ path: 'owner', select: 'name email  role subscription' }); 

    sortBy && (sortCriteria = { [`${sortBy}`]: 1 }); 
    sortByDesc && (sortCriteria = { [`${sortByDesc}`]: -1 }); 
    filter && (result = result.select(filter.split('|').join(' ')));
    (page < 0) && (page = 1); 
    ((Number(page) - 1) * Number(limit) > total) && ( page = Math.ceil(total / Number(limit)));

    result = await result.skip((Number(page) - 1) * Number(limit)).limit(Number(limit)).sort(sortCriteria); 

    (favorite === 'false') && (result = result.filter(item => item.favorite === false));
    (favorite === 'true') && (result = result.filter(item => item.favorite === true));
    return {total, page, contacts: result}; 
};

export default listContacts;