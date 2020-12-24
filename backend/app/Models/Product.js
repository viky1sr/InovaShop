import mongoose from 'mongoose';

const reviewsSchema = mongoose.Schema({
   name: {type: String, required: true},
   rating: {type: Number, required: true},
   comment: {type: String, required: true},
}, {
    timestamps: true,
});

const productsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: ['Please add your name', true],
    },
    image: {
        type: String,
        required: ['Please add a image', true],
    },
    brand: {
        type: String,
        required: ['Please add a brand', true],
    },
    category: {
        type: String,
        required: ['Please add a category', true],
    },
    description: {
        type: String,
        required: ['Please add a description', true],
    },
    reviews: [reviewsSchema],
    rating: {
        type: Number,
        required: ['Please add a rating', true],
        default: 0
    },
    numReviews: {
        type: Number,
        required: ['Please add a reviews', true],
        default: 0
    },
    price: {
        type: Number,
        required: ['Please add a price', true],
        default: 0
    },
    countInStock: {
        type: Number,
        required: ['Please add a stock', true],
        default: 0
    },
},{
    timestamps: true,
});

const Product = mongoose.model('Product',productsSchema);

export default Product;