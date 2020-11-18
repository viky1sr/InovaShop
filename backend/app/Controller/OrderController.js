import expressAsyncHandler from 'express-async-handler';
import Order from '../Models/Order.js';


// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = expressAsyncHandler(async (req, res) => {
    const {
        orderItems,
        discountPrice,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({
            orderItems,
            discountPrice,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = expressAsyncHandler(async (req, res) => {
    // populate untuk join data bases
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email isAdmin'
    )

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
});

// @desc    Update Order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentMethod = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address : req.body.payer.email_address
        }

        const updateOrder = await order.save()

        res.json(updateOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
});
