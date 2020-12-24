import express from 'express';
import {getProducts, getProductsId, deleteProductId, createdProduct, updateProduct} from "../app/Controller/ProductController.js";
import {admin, protect} from "../app/Middleware/AuthMiddleware.js";
const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, admin, createdProduct)
router.route('/:id')
    .get(getProductsId)
    .delete(protect, admin, deleteProductId)
    .put(protect, admin, updateProduct)

export default router;