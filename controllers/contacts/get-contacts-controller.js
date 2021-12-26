import contactsModel from '../../repository/contacts/index';
import {httpCodes} from '../../lib/constants';

export default async (req, res, next) => {
  const contacts = await contactsModel.listContacts(req.query); 
  res.status(httpCodes.OK).json({status: 'success', code: httpCodes.OK, data: {...contacts}})
};
