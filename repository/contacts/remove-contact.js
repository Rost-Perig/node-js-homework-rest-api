import Contact from '../../models/contact';

const removeContact = async (contactId) => {
    const result = await Contact.findByIdAndRemove(contactId);  
    return result;
};

export default removeContact;
