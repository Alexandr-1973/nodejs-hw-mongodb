import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async (personalUserId,{
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = Contact.find({userId:personalUserId});

  // const QUERY = await Contact.find({userId:personalUserId});

  // console.log("QUERY",QUERY);

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
  if (contact.userId===personalUserId) {
  return contact;
  } else {
    return null;
  }
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  // console.log("contact", contact);
  return contact;
};

export const updateContact = async (personalUserId, contactId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value ) return null;
  if (rawResult.value.userId !==personalUserId ) return null;
// console.log("RRRRRR",rawResult.value.userId);

  return rawResult.value;
};

export const deleteContact = async (personalUserId,contactId) => {

const contactById = await getContactById(personalUserId,contactId);

// console.log("YYYYYY", contactById);

  if (!contactById) return null;

// const contact = await Contact.findById(contactId);
//   if (contact.userId!==personalUserId) return null;



  const contactDelete = await Contact.findOneAndDelete({
    _id: contactId,
  });

  return contactDelete;
  // if (contact.userId===personalUserId) {
  //   return contact;
  //   } else {
  //     return null;
  //   }
};
