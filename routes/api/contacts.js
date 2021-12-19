import {Router} from 'express';
const router = new Router();
import model from '../../model/index';
import { validateCreate, validateUpdate, validateId } from '../api/validation';

router.get('/', async (req, res, next) => {
  const contacts = await model.listContacts();
  res.status(200).json(contacts)
});

router.get('/:id', validateId, async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.getContactById(id);
  contact ?
    res.status(200).json( contact ) :
    res.status(404).json({ message: 'Not found'});
});

router.post('/', validateCreate, async (req, res, next) => {
  const newContact = await model.addContact(req.body);
  res.status(201).json( newContact );
});

router.delete('/:id', validateId, async (req, res, next) => {
  const { id } = req.params
  const deletedContact = await model.removeContact(id);
  deletedContact ?
    res.status(200).json({ message: 'contact deleted'}) :
    res.status(404).json({ message: 'Not found' });
});

router.put('/:id', validateId, validateUpdate, async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.updateContact(id, req.body);
  contact ?
    res.status(200).json( contact ) :
    res.status(404).json({ message: 'Not found'});
});

export default router;
