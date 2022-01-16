import {  validateUpdate, validateUsersQuery, validateId } from '../middlewares/validation/usersValidation';
import roleAccess from '../middlewares/role-access';
import userControllers from '../controllers/users/user-controllers';
import guard from '../middlewares/guard'; 
import { upload } from '../middlewares/upload';
import uploadControllers from '../controllers/upload/upload-controllers';
import { Router } from 'express';
import { Role } from '../lib/constants';

const { getUsers, getUser, putUser, delUser, } = userControllers;
const { uploadAvatar } = uploadControllers;

const router = new Router();

router.get('/', [guard, roleAccess(Role.ADMIN), validateUsersQuery], getUsers);

router.get('/:id', [guard, validateId], getUser);

router.put('/:id/update', [guard, roleAccess(Role.ADMIN), validateId, validateUpdate], putUser);

router.delete('/:id', [guard, roleAccess(Role.ADMIN), validateId], delUser);

router.patch('/avatar', [guard, upload.single('avatar')], uploadAvatar);

export default router;