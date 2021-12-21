
import contacts from '../../db/contacts.json';

const getContactById = async (contactId) => contacts.filter(item => item.id === contactId)[0];

export default getContactById;
