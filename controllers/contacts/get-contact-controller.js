import getContactById from '../../repository/contacts/get-contact';
import {httpCodes, Messages, Role} from '../../lib/constants';

export default async (req, res, next) => {
  const { id } = req.params;
  const isAdmin = (req.user.role === Role.ADMIN); 
  const { id: userId } = req.user; 
  const contact = await getContactById(userId, id, isAdmin);
  contact ?
    res.status(httpCodes.OK).json( {status: 'success', code: httpCodes.OK, data: {contact}} ) : 
    res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: Messages.NOT_FOUND[req.app.get('lang')]});
};
