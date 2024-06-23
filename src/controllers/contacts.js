import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { foundId } from '../validation/foundId.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {

  // console.log("request", req);
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  console.log("personal", req.user.id);

  const contacts = await getAllContacts(req.user.id,{
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  const filterMessage =
    contacts.data.length > 0
      ? 'Successfully found contacts!'
      : 'Contacts not found, try change filters';
  res.json({
    status: 200,
    message: filterMessage,
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(req.user.id, contactId);
  if (!foundId(contactId, contact, next)) return;

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact({...req.body, userId:req.user._id});

  // contact.userId=req.user._id;

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',

    data: contact,

  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

console.log(req.user.id);

  const contact = await updateContact(req.user.id, contactId, req.body)

    // const contact = await Contact.findById(contactId);
  // if (contact.userId===personalUse) {
  // return contact;
  // } else {
  //   return null;
  // };

  if (!foundId(contactId, contact, next)) return;

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(req.user.id,contactId);
  if (!foundId(contactId, contact, next)) return;

  res.status(204).send();
};
