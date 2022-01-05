
import { validateCreate, validateUpdate, validateId, validateUpdateFavorite, validateQuery } from '../middlewares/validation/contactsValidation';
import getContactsController from '../controllers/contacts/get-contacts-controller';
import getContactController from '../controllers/contacts/get-contact-controller';
import deleteContactController from '../controllers/contacts/del-contact-controller';
import postContactController from '../controllers/contacts/post-contact-controller';
import putContactController from '../controllers/contacts/put-contact-controller';
import guard from '../middlewares/guard';
import {Router} from 'express';
const router = new Router();

router.get('/', [guard, validateQuery], getContactsController);

router.get('/:id', [guard, validateId], getContactController);

router.post('/', [guard, validateCreate], postContactController);

router.delete('/:id', [guard, validateId], deleteContactController);

router.put('/:id', [guard, validateId, validateUpdate], putContactController);

router.patch('/:id/favorite', [guard, validateId, validateUpdateFavorite], putContactController);

export default router;
