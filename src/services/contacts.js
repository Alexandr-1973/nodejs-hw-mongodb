import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async (
  personalUserId,
  {
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
  },
) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = Contact.find({ userId: personalUserId });

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const contactsCount = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (personalUserId, contactId) => {
  const contact = await Contact.findById(contactId);

  if (contact && contact.userId === personalUserId) {
    return contact;
  } else {
    return null;
  }
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);

  return contact;
};

export const updateContact = async (
  personalUserId,
  contactId,
  payload,
  options = {},
) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;
  if (rawResult.value.userId !== personalUserId) return null;

  return rawResult.value;
};

export const deleteContact = async (personalUserId, contactId) => {
  const contactDelete = await Contact.findOneAndDelete({
    _id: contactId,
    userId: personalUserId,
  });

  return contactDelete;
};
