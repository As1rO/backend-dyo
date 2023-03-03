import express from 'express';
import { authController } from '../controllers/auth.controller';
import { userController } from '../controllers/user.controller';

const router = express.Router();

// auth
router.post('/register', authController.signup);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

//user
router.get('/', userController.getAllUSers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);

export const userRoutes = router;
