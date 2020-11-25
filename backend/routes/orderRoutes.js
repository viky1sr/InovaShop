import express from 'express';
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid
} from "../app/Controller/OrderController.js";
const router = express.Router();
import { protect } from '../app/Middleware/AuthMiddleware.js';


router.route('/')
    .post(protect, addOrderItems)

router.route('/:id')
    .get(protect, getOrderById)

router.route('/:id/pay')
    .put(protect, updateOrderToPaid)

export default router;