import {  validateUpdate, validateUsersQuery, validateId } from '../middlewares/validation/usersValidation';
import roleAccess from '../middlewares/role-access';
import getUsersController from '../controllers/users/get-users-controller';
import getUserController from '../controllers/users/get-user-controller';
import putUserController from '../controllers/users/put-user-controller';
import deleteUserController from '../controllers/users/del-user-controller';
import guard from '../middlewares/guard'; 
import {Router} from 'express';
import { Role } from '../lib/constants';
const router = new Router();

router.get('/', [guard, roleAccess(Role.ADMIN), validateUsersQuery], getUsersController);

router.get('/:id', [guard, validateId], getUserController);

// router.get('/current', [guard, roleAccess(Role.ADMIN), validateId], getUserController);

router.put('/:id/update', [guard, roleAccess(Role.ADMIN), validateId, validateUpdate], putUserController);

router.delete('/:id', [guard, roleAccess(Role.ADMIN), validateId], deleteUserController);

export default router;