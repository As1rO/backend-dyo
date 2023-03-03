import express from 'express';
import bodyParser from 'body-parser';
import { userRoutes } from './routes/user.routes';
import dotenv from 'dotenv';
import './config/db';

dotenv.config({
  path: './config/.env',
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
