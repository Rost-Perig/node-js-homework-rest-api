import contactsModel from '../../../models/contacts/index';

export default async (req, res, next) => {
  const newContact = await contactsModel.addContact(req.body);
  res.status(201).json( newContact );
};
