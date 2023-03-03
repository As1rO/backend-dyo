import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { errors } from '../utils/errors.utils';

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

const signup = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const error = errors.signUpErrors(err);
    res.status(200).send({ error });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const error = errors.signUpErrors(err);
    res.status(200).send({ error });
  }
};

const logout = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
  } catch (err) {
    res.status(200).send({ err });
  }
};
export const authController = { signup, signIn, logout };
