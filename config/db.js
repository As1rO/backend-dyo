import admin from 'firebase-admin';
import credentials from './serviceAccountKey.js';
import dotenv from 'dotenv';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

export const db = admin.database();