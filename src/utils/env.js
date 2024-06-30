import dotenv from 'dotenv';
import { SMTP } from '../constants/index.js';
// import { env } from './env.js';

dotenv.config();

export function env(name, defaultValue) {
  const value = process.env[name];

  console.log("VALUE", process.env[SMTP.SMTP_HOST]);

  if (value) return value;

  if (defaultValue) return defaultValue;

  console.log();

  throw new Error(`Missing: process.env['${name}'].`);
}
