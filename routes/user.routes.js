import { Router } from 'express';
import { getUsers, createUser } from '../controllers/user.controller.js';

const router = Router();

// Route pour obtenir tous les utilisateurs
router.get('/', getUsers);

// Route pour créer un nouvel utilisateur
router.post('/', createUser);

// Exporter la fonction middleware
export default (db) => router;