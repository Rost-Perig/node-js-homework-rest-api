import { httpCodes, Messages } from '../../lib/constants';
import AuthService from '../../service/auth/auth-service';
// import UserService from '../../service/users/user-service';//variant
import createUser from '../../repository/users/create-user';

// const userService = new UserService();//variant
const authService = new AuthService();

export default async (req, res, next) => {
  const { email } = req.body; 
  const isUserExist = await authService.isUserExist(email);
  if (isUserExist) {
    return res.status(httpCodes.CONFLICT).json({ status: 'error', code: httpCodes.CONFLICT, message: Messages.CONFLICT[req.app.get('lang')] });
  };

  // const data = await userService.create(req.body);//variant
  const data = await createUser(req.body);

  res.status(httpCodes.OK).json({ status: 'success', code: httpCodes.OK, data });
};