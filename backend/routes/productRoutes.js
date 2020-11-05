import express from 'express';
import expressAsyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../app/Models/Product.js';

// @desc Fetch all products
// @desc Get /api/v1/products
// @access Public
router.get('/', expressAsyncHandler( async (req, res) => {
    const products = await Product.find({})

    res.json(products)
}));

// @desc Fetch products by id
// @desc Get /api/v1/products/:id
// @access Public
router.get('/:id', expressAsyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

}));

export default router;