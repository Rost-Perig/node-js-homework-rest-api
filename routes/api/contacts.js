import {Router} from 'express';
const router = new Router();
import { validateCreate, validateUpdate, validateId } from '../../midllewares/validation/contactsValidation';
import getContactsController from '../controllers/contacts/get-contacts';
import getContactController from '../controllers/contacts/get-contact';
import deleteContactController from '../controllers/contacts/delete-contact';
import postContactController from '../controllers/contacts/post-contact';
import putContactController from '../controllers/contacts/put-contact';

router.get('/', getContactsController);

router.get('/:id', validateId, getContactController);

router.post('/', validateCreate, postContactController);

router.delete('/:id', validateId, deleteContactController);

router.put('/:id', validateId, validateUpdate, putContactController);

export default router;
