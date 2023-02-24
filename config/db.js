import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vincent-fcb1a-default-rtdb.europe-west1.firebasedatabase.app/'
});

export const db = admin.database();