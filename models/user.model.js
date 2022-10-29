import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;
const { isEmail } = validator;

const UserSchema = new Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLenght: 3,
      maxLenght: 55,
      unique: true,
      trimp: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail],
      lowerCase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minLenght: 6,
    },
    picture: {
      type: String,
      default: './uploads/profil/random-user.png',
    },
    bio: {
      type: String,
      max: 1024,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    is_first_connexion: {
      type: Boolean,
      default: true,
    },
    is_email_validate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
/**
 *
 */
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

export const UserModel = mongoose.model('user', UserSchema);
