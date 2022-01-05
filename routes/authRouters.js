
import { validateRegistration, validateLogin } from '../middlewares/validation/authValidation';
import registration from '../controllers/auth/reg-user-controller';
import login from '../controllers/auth/login-user-controller';
import logout from '../controllers/auth/logout-user-controller';
import guard from '../middlewares/guard'; 
import limiter from '../middlewares/rate-limit';
import { TIME_REQUEST_LIMIT, REQUEST_LIMIT } from '../lib/constants';
import { Router } from 'express';
const router = new Router();

router.post('/registration', limiter(TIME_REQUEST_LIMIT, REQUEST_LIMIT), validateRegistration, registration); 

router.post('/login', validateLogin, login);

router.post('/logout', guard, logout); 

export default router;
