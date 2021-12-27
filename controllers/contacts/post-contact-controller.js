import contactsModel from '../../repository/contacts/index';
import {httpCodes} from '../../lib/constants';

export default async (req, res, next) => {
  const newContact = await contactsModel.addContact(req.body);
  res.status(httpCodes.CREATED).json( {status: 'success', code: httpCodes.CREATED, data: {newContact}} );
};
