import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
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
  const { contactId } = req.params;
  const contacts = await getAllContacts();
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

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const contacts = await getAllContacts();
  const { contactId } = req.params;
  const queryId = contacts.find((item) => item.id === contactId);
  if (!queryId) {
    next(createHttpError(404, `Contact with ${contactId} not found`));
    return;
  }

  const result = await updateContact(contactId, req.body);
  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const contacts = await getAllContacts();
  const { contactId } = req.params;
  const queryId = contacts.find((item) => item.id === contactId);
  if (!queryId) {
    next(createHttpError(404, `Contact with ${contactId} not found`));
    return;
  }

  deleteContact(contactId);

  res.status(204).send();
};
