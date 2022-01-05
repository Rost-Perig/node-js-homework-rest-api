import addContact from '../../repository/contacts/add-contact';
import {httpCodes} from '../../lib/constants';

export default async (req, res, next) => {
  const { id: userId } = req.user; 
  const newContact = await addContact(userId, req.body);
  res.status(httpCodes.CREATED).json( {status: 'success', code: httpCodes.CREATED, data: {newContact}} );
};
