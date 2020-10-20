import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

/**
 * * @desc    Create new order
 * * @route   POST '/api/orders'
 * * @access  Private
 **/
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice
		});
		const creaetedORder = await order.save();
		res.status(201).json(creaetedORder);
	}
});

export { addOrderItems };
