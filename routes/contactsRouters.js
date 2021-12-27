
import { validateCreate, validateUpdate, validateId, validateUpdateFavorite, validateQuery } from '../midllewares/validation/contactsValidation';
import getContactsController from '../controllers/contacts/get-contacts-controller';
import getContactController from '../controllers/contacts/get-contact-controller';
import deleteContactController from '../controllers/contacts/del-contact-controller';
import postContactController from '../controllers/contacts/post-contact-controller';
import putContactController from '../controllers/contacts/put-contact-controller';
import {Router} from 'express';
const router = new Router();

router.get('/', validateQuery, getContactsController);

router.get('/:id', validateId, getContactController);

router.post('/', validateCreate, postContactController);

router.delete('/:id', validateId, deleteContactController);

router.put('/:id', validateId, validateUpdate, putContactController);

router.patch('/:id/favorite', validateId, validateUpdateFavorite, putContactController);

export default router;
