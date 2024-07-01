import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  patchContacttSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/validateMongoId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use('/:contactId', isValidId);
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post(
  '/',
  validateBody(createContactSchema),
  upload.single('photo'),
  ctrlWrapper(createContactController),
);
router.patch(
  '/:contactId',
  validateBody(patchContacttSchema),
  upload.single('photo'),
  ctrlWrapper(patchContactController),
);
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
