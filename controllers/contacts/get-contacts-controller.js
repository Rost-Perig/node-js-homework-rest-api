import listContacts from '../../repository/contacts/list-contacts';
import {httpCodes, Role} from '../../lib/constants';

export default async (req, res, next) => {
  console.log('req.user.role=', req.user.role);
  const isAdmin = (req.user.role === Role.ADMIN);
  const { id: userId } = req.user; 
  const contacts = await listContacts(userId, req.query, isAdmin); 
  res.status(httpCodes.OK).json({status: 'success', code: httpCodes.OK, data: {...contacts}})
};
