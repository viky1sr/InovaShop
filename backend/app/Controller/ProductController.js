import expressAsyncHandler from 'express-async-handler';
import Product from '../Models/Product.js';
import UserDB from "../Models/User.js";

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


// @desc Fetch products by id
// @desc Delete /api/v1/products/:id
// @access Private
export const deleteProductId = expressAsyncHandler(async (req, res, next) => {
   const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove()
        res.status(200).json({
            message: "Product has been removed"
        })
    } else {
        res.status(401)
        throw new Error(`Product not found`)
    }
});


// @desc Fetch products by id
// @desc Create /api/v1/products/create
// @access Private
export const createdProduct = expressAsyncHandler(async (req, res, next) => {
    const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        numReviews,
        description,  } = req.body

    const getUserId = await UserDB.findById(req.user._id)

    const product = new Product({
        name,
        price,
        user: getUserId._id,
        image,
        brand,
        category,
        countInStock,
        numReviews,
        description,
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
});

// @desc Fetch products by id
// @desc Update /api/v1/products/create
// @access Private
export const updateProduct = expressAsyncHandler(async (req, res, next) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save();
        res.json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product not found')
    }
});
