import removeContact from '../../repository/contacts/remove-contact';
import {httpCodes, Messages, Role} from '../../lib/constants';

export default async (req, res, next) => {
  const { id } = req.params;
  const isAdmin = (req.user.role === Role.ADMIN);
  const { id: userId } = req.user;  
  const deletedContact = await removeContact(userId, id, isAdmin);
  deletedContact ?
    res.status(httpCodes.OK).json({status: 'success', code: httpCodes.OK, data: {deletedContact}}) :
    res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: Messages.NOT_FOUND[req.app.get('lang')] });
};
