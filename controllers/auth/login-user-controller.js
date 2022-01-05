import { httpCodes, Messages } from '../../lib/constants';
import AuthService from '../../service/auth/auth-service';
const authService = new AuthService();

export default async (req, res, next) => {
  const { email, password } = req.body; 
  const user = await authService.getUser(email, password); 

  if (!user) {
    return res.status(httpCodes.UNAUTHORIZED).json({ status: 'error', code: httpCodes.UNAUTHORIZED, message: Messages.UNAUTHORIZED[req.app.get('lang')] });
  };
  const token = authService.getToken(user); 
  await authService.setToken(user.id, token); 
  res.status(httpCodes.OK).json({status: 'success', code: httpCodes.OK, data: {token}})
};