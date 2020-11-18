import express from 'express';
import {
    addOrderItems
} from "../app/Controller/OrderController.js";
const router = express.Router();
import { protect } from '../app/Middleware/AuthMiddleware.js';


router.route('/')
    .post(protect, addOrderItems)

export default router;