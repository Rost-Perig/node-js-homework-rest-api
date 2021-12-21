import contactsModel from '../../models/contacts/index';

export default async (req, res, next) => {
  const { id } = req.params
  const deletedContact = await contactsModel.removeContact(id);
  deletedContact ?
    res.status(200).json({ message: 'contact deleted'}) :
    res.status(404).json({ message: 'Not found' });
};
