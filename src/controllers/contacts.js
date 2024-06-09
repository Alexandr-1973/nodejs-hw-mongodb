import { getAllContacts, getContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const contacts = await getAllContacts();
  const { contactId } = req.params;
  const queryId = contacts.find((item) => item.id === contactId);

  if (!queryId) {
    next(createHttpError(404, `Contact with ${contactId} not found`));
    return;
  }

  const contact = await getContactById(contactId);
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
