import { db } from '../config/db.js';
import User from '../models/user.model.js';

export const getUsers = async (req, res) => {
  try {
    const usersRef = db.ref('users');
    const snapshot = await usersRef.once('value');
    const users = snapshot.val();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const usersRef = db.ref('users');
    const newUserRef = usersRef.push();
    const newUser = new User(newUserRef.key, name, email);
    await newUserRef.set(newUser.toJson());
    res.status(201).json(newUser.toJson());
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création d'un nouvel utilisateur" });
  }
};
