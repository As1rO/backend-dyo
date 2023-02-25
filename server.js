import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes.js';
import dotenv from 'dotenv';
import {db} from './config/db.js';

dotenv.config({
  path: './config/.env',
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utilisez db (Firebase Realtime Database) dans vos routes
app.use('/api/user', userRoutes(db));

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${process.env.PORT || 3000}`);
});