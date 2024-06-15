import createHttpError from 'http-errors';

export const foundId = (contactId, contact, next) => {
  if (!contact) {
    next(createHttpError(404, `Contact with ${contactId} not found`));
    return;
  }
  return contact;
};
