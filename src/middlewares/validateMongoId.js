import { isValidObjectId } from "mongoose";
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {

    next(createHttpError(404, `Contact with ${contactId} not found`), {
        "message": "Contact not found"
    });
  }

  next();
};
