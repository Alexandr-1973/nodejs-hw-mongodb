// src/utils/sendMail.js

import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';
import { env } from './env.js';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST)
  // process.env[SMTP.SMTP_HOST]
//   "sandbox.smtp.mailtrap.io",
//   env(SMTP.SMTP_HOST)
  ,
  port:Number(env(SMTP.SMTP_PORT))
  // Number(process.env[SMTP.SMTP_PORT])
//   2525
//   Number(env(SMTP.SMTP_PORT))
  ,
  auth: {
    user:env(SMTP.SMTP_USER)
    // process.env[SMTP.SMTP_USER]
	// "dd5b65c1accfb3"
	// String(env(SMTP.SMTP_USER))
	// env(SMTP.SMTP_USER)
	,
    pass:env(SMTP.SMTP_PASSWORD)
    // process.env[SMTP.SMTP_PASSWORD]
	// "337f3d6094998e"
	// String(env(SMTP.SMTP_PASSWORD))
	// env(SMTP.SMTP_PASSWORD)
	,
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
