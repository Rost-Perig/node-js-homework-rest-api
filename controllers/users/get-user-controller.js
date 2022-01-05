import getUserById from '../../repository/users/get-user';
import {httpCodes, Messages, Role} from '../../lib/constants';

export default async (req, res, next) => {
  let { id } = req.params;
  const { id: currentUserId } = req.user;
  (id === 'current') && (id = currentUserId);
  const isAdmin = (req.user.role === Role.ADMIN);
  const soughtUser = await getUserById(id, currentUserId, isAdmin);
  const { name, email, role, subscription } = soughtUser;
  let result = null;
  isAdmin ?
    result = soughtUser :
    result = {name, email, role, subscription};
  soughtUser ?
    res.status(httpCodes.OK).json({ status: 'success', code: httpCodes.OK, data: {result}} ) : 
    res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: Messages.NOT_FOUND[req.app.get('lang')]});
};
