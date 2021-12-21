import contactsModel from '../../models/contacts/index';

export default async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsModel.updateContact(id, req.body);
  contact ?
    res.status(200).json( contact ) :
    res.status(404).json({ message: 'Not found'});
};
