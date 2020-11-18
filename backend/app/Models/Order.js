import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [{
       name: {  type: String, required: ['Please add a name', true] },
       qty: {  type: Number, required: ['Please add an quality', true] },
       price: {  type: Number, required: ['Please add a price', true] },
       image: {  type: String, required: ['Please add an image', true] },
       product: {
           type: mongoose.Schema.Types.ObjectId,
           required: ['Please add a product', true],
           ref: 'Product'
       },
    }],
    shippingAddress: {
      address: {  type: String, required: ['Please add your address', true]},
      city: {  type: String, required: ['Please add your city', true]},
      zipCode: {  type: String, required: ['Please add your zip code', true]},
      country: {  type: String, required: ['Please add your country', true]},
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
       id: { type: String },
       status: { type: String },
       update_time: { type: String },
       email_address: { type: String },
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    discountPrice : {
      type: String,
      default: null
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date,
    },
},{
    timestamps: true,
});

const Order = mongoose.model('Order',orderSchema);

export default Order;