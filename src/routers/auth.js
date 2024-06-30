import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { requestResetEmailSchema } from '../validation/auth.js';
import { requestResetEmailController } from '../controllers/auth.js';

import { resetPasswordSchema } from '../validation/auth.js';
import { resetPasswordController } from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;

// src/routers/auth.js



/* Інший код файлу */

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);



/* Інший код файлу */

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);
