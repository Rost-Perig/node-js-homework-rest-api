import Contact from '../../models/contact';

const updateContact = async (userId, contactId, body, isAdmin) => { 
    let result = null; 
    isAdmin ?
        result = await Contact.findByIdAndUpdate(contactId, { ...body }, {new: true}):
        result = await Contact.findOneAndUpdate({_id: contactId, owner: userId}, { ...body }, {new: true});
    return result;
};

export default updateContact;
