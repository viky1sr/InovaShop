import express from 'express';
import { login, getUserProfile, register, updateUserProfile, getUser, getUserById, deleteUser, updateUser } from "../app/Controller/UserController.js";
const router = express.Router();
import { protect, admin } from '../app/Middleware/AuthMiddleware.js';

router.get('/', protect, admin, getUser);
router.post('/login', login);
router.post('/register', register);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)

export default router;