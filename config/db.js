import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
  path: './config/.env',
});

mongoose
  .connect(process.env.DB_USER_PASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Failed to mongoDB', error));
