
import { validateRegistration, validateLogin } from '../middlewares/validation/authValidation';
import authControllers from '../controllers/auth/auth-controllers';
import guard from '../middlewares/guard'; 
import limiter from '../middlewares/rate-limit';
import { TIME_REQUEST_LIMIT, REQUEST_LIMIT } from '../lib/constants';
import { Router } from 'express';

const router = new Router();
const {registration, login, logout} = authControllers;

router.post('/registration', limiter(TIME_REQUEST_LIMIT, REQUEST_LIMIT), validateRegistration, registration); 

router.post('/login', validateLogin, login);

router.post('/logout', guard, logout); 

export default router;
