import { db } from '../config/db.js';

export const getUsers = async (req, res) => {
  try {
    const snapshot = await db.ref('users').once('value');
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
    const userRef = db.ref('users').push();
    const newUser = {
      id: userRef.key,
      name,
      email,
    };
    await userRef.set(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création d'un nouvel utilisateur" });
  }
};
