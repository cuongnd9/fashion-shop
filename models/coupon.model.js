const mongoose = require('mongoose')

const Schema = mongoose.Schema

const couponSchema = new Schema({
	code: String,
	discount: Number
})

const Coupon = mongoose.model('Coupon', couponSchema, 'coupons')

module.exports = Coupon