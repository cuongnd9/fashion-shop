const fs = require('fs')

const Session = require('../models/session.model')
const Product = require('../models/product.model')

module.exports.index = async (req, res) => {
	const data = fs.readFileSync('public/data/countries.json', 'utf8')
	const countries = JSON.parse(data)

	const cart = (await Session.findById(req.signedCookies.sessionId)).cart
	for (item of cart) {
		item.product = await Product.findById(item.productId)
	}
	
	res.render('cart/index', { 
		cart,
		countries
	 })
}

module.exports.addToCart = async (req, res) => {
	const { sessionId } = req.signedCookies
	if (!sessionId) {
		res.redirect('/products')
		return
	}

	const { productId } = req.params
	const session = await Session.findById(sessionId)
	const product = await Product.findById(productId)

	let index
	const productInCart = session.cart.find((product, i) => {
		index = i
		return product.productId === productId
	})
	if (productInCart) {
		session.cart[index].quantity += 1
	} else {
		session.cart.push({
			productId: productId,
			quantity: 1
		})
	}

	await session.save()

	res.redirect('back')
}