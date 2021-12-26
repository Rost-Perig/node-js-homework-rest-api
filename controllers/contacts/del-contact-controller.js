import contactsModel from '../../repository/contacts/index';
import {httpCodes} from '../../lib/constants';

export default async (req, res, next) => {
  const { id } = req.params
  const deletedContact = await contactsModel.removeContact(id);
  deletedContact ?
    res.status(httpCodes.OK).json({status: 'success', code: httpCodes.OK, data: {deletedContact}}) :
    res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: 'Not found' });
};
