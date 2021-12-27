import Contact from '../../models/contact';

/*с кастомной простой пагинацией. */

const listContacts = async ({
        sortBy, 
        sortByDesc, 
        filter,
        limit = 12,
        skip = 0  
}) => {
    let sortCriteria = null;
    const total = await Contact.find().countDocuments();
    let result = Contact.find(); 

    sortBy && (sortCriteria = { [`${sortBy}`]: 1 }); 
    sortByDesc && (sortCriteria = { [`${sortByDesc}`]: -1 }); 
    filter && (result = result.select(filter.split('|').join(' ')));

    result = await result.skip(Number(skip)).limit(Number(limit)).sort(sortCriteria); 
    
    return {total, contacts: result}; 
};

export default listContacts;