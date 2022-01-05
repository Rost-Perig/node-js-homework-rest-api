import { httpCodes } from '../../lib/constants';
import AuthService from '../../service/auth/auth-service';
const authService = new AuthService();

export default async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  
  res.status(httpCodes.NO_CONTENT).json({status: 'success', code: httpCodes.NO_CONTENT, data: {}})
};