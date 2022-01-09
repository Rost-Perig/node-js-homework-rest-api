
import { validateCreate, validateUpdate, validateId, validateUpdateFavorite, validateQuery } from '../middlewares/validation/contactsValidation';
import contactControllers from '../controllers/contacts/contact-controllers';
import guard from '../middlewares/guard';
import {Router} from 'express';
const router = new Router();

router.get('/', [guard, validateQuery], contactControllers.getContacts);

router.get('/:id', [guard, validateId], contactControllers.getContact);

router.post('/', [guard, validateCreate], contactControllers.postContact);

router.delete('/:id', [guard, validateId], contactControllers.delContact);

router.put('/:id', [guard, validateId, validateUpdate], contactControllers.putContact);

router.patch('/:id/favorite', [guard, validateId, validateUpdateFavorite], contactControllers.putContact);

export default router;
