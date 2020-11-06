import expressAsyncHandler from 'express-async-handler';
import Product from '../Models/Product.js';

// @desc Fetch all products
// @desc Get /api/v1/products
// @access Public
export const getProducts = expressAsyncHandler( async (req, res, next) => {
    const products = await Product.find({})

    if (products) {
        res.json(products)
    } else {
        res.status(401)
        throw new Error('Not Authorized')
    }
});


// @desc Fetch products by id
// @desc Get /api/v1/products/:id
// @access Public
export const getProductsId = expressAsyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
});