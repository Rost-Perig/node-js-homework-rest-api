import removeUser from '../../repository/users/remove-user';
import {httpCodes, Messages, Role} from '../../lib/constants';

export default async (req, res, next) => {
  const { id } = req.params;
  const isAdmin = (req.user.role === Role.ADMIN); 
  const deletedUser = await removeUser(id, isAdmin);
  deletedUser ?
    res.status(httpCodes.OK).json({status: 'success', code: httpCodes.OK, data: {deletedUser}}) :
    res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: Messages.NOT_FOUND[req.app.get('lang')] });
};