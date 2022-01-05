// import UserService from '../../service/users/user-service'; //variant
import updateUserById from '../../repository/users/update-user';
import { httpCodes, Messages } from '../../lib/constants';

// const userService = new UserService();//variant

export default async (req, res, next) => {
  const { id } = req.params;  
  const updatedUser = await updateUserById(id, req.body);
  // const updatedUser = await userService.updateUser(id, req.body); //variant
  
  updatedUser ?
    res.status(httpCodes.OK).json( {status: 'success', code: httpCodes.OK, message: req.body} ) :
    res.status(httpCodes.NOT_FOUND).json({ status: 'error', code: httpCodes.NOT_FOUND, message: Messages.NOT_FOUND[req.app.get('lang')]});
};