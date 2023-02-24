import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes';
import { db } from './config/db';
import dotenv from 'dotenv';
const app2 = initializeApp(firebaseConfig)
const db = getDatabase(app2)

dotenv.config({
  path: './config/.env',
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utilisez db (Firebase Firestore) dans vos routes
app.use('/api/user', userRoutes(db2));

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${3000}`);
});


