import express from 'express';
import {getProducts, getProductsId} from "../app/Controller/ProductController.js";
const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductsId);

export default router;