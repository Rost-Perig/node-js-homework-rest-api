import contactsModel from '../../models/contacts/index';

export default async (req, res, next) => {
  const contacts = await contactsModel.listContacts();
  res.status(200).json(contacts)
};
