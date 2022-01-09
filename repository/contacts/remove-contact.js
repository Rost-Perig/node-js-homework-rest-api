import Contact from '../../models/contact';

const removeContact = async (userId, contactId, isAdmin) => {
    let result = null;  
    isAdmin ?
        result = await Contact.findByIdAndRemove(contactId) :
        result = await Contact.findOneAndRemove({ _id: contactId, owner: userId });
    return result;
};

export default removeContact;
