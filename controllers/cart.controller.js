const Session = require('../models/session.model')
const Product = require('../models/product.model')

module.exports.index = (req, res) => {
	res.render('cart/index')
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

	var index;
	const productInCart = session.cart.find((product, i) => {
		index = i
		return product.productId === productId
	})
	if (productInCart) {
		session.cart[index].count += 1
	} else {
		session.cart.push({
			productId: productId,
			count: 1
		})
	}

	await session.save()

	app.set('isAddedToCart', true)
	app.set('selectedProduct', product.name)
	res.redirect('back')
}