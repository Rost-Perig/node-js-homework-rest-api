
import { validateCreate, validateUpdate, validateId, validateUpdateFavorite, validateQuery } from '../middlewares/validation/contactsValidation';
import contactControllers from '../controllers/contacts/contact-controllers';
import guard from '../middlewares/guard';
import { Router } from 'express';

const router = new Router();
const { getContacts, getContact, postContact, delContact, putContact} = contactControllers;

router.get('/', [guard, validateQuery], getContacts);

router.get('/:id', [guard, validateId], getContact);

router.post('/', [guard, validateCreate], postContact);

router.delete('/:id', [guard, validateId], delContact);

router.put('/:id', [guard, validateId, validateUpdate], putContact);

router.patch('/:id/favorite', [guard, validateId, validateUpdateFavorite], putContact);

export default router;
