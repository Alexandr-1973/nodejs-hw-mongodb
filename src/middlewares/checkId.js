import createHttpError from 'http-errors';

import { Contact } from '../db/models/contact.js';

export const checkId = (userId) => {
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(createHttpError(401));
      return;
    }

	const { contactId } = req.params;
	if (!contactId) {
	  next(createHttpError(403));
	  return;
	}

    const contact = await Contact.findOne({
      _id: userId,
    });

    if (contact) {
      next();
      return;
    }

    next(createHttpError(403));
  };
};
