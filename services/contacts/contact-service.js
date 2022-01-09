import Contact from '../../models/contact';

class ContactService {

    async add(userId, body) {  
        const result = await Contact.create({...body, owner: userId}); 
        return result;
    };

    async getById(userId, contactId, isAdmin) {  
        let result = null;
        isAdmin ? 
            result = await Contact.findById({_id: contactId, owner: userId}).populate({path: 'owner', select: 'name email role subscription'}):
            result = await Contact.findOne({ _id: contactId, owner: userId }).populate({ path: 'owner', select: 'name email role subscription' }); 
        return result;
    };

    async list(userId, {sortBy, sortByDesc,  page = 1, filter, limit = 12, favorite}, isAdmin) {
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

    async remove(userId, contactId, isAdmin) {
        let result = null;  
        isAdmin ?
            result = await Contact.findByIdAndRemove(contactId) :
            result = await Contact.findOneAndRemove({ _id: contactId, owner: userId });
        return result;
    };

    async update(userId, contactId, body, isAdmin) { 
        let result = null; 
        isAdmin ?
            result = await Contact.findByIdAndUpdate(contactId, { ...body }, {new: true}):
            result = await Contact.findOneAndUpdate({_id: contactId, owner: userId}, { ...body }, {new: true});
        return result;
    };
};
 
const contactService = new ContactService;

export default contactService;

