import Contact from '../../models/contact';

const getContactById = async (userId, contactId, isAdmin) => {  
    let result = null;
    isAdmin ? 
        result = await Contact.findById({_id: contactId, owner: userId}).populate({path: 'owner', select: 'name email role subscription'}):
        result = await Contact.findOne({ _id: contactId, owner: userId }).populate({ path: 'owner', select: 'name email role subscription' }); 
    return result;
};

export default getContactById;
