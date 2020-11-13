import express from 'express';
import { login, getUserProfile, register, updateUserProfile } from "../app/Controller/UserController.js";
const router = express.Router();
import { protect } from '../app/Middleware/AuthMiddleware.js';

router.post('/login', login);
router.post('/register', register);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router;