import listUsers from '../../repository/users/list-users';
import {httpCodes} from '../../lib/constants';

export default async (req, res, next) => {
  const users = await listUsers(req.query); 
  res.status(httpCodes.OK).json({status: 'success', code: httpCodes.OK, data: {...users}})
};