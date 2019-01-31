const Product = require('../models/product.model')

module.exports.index = async (req, res) => {
	const page = parseInt(req.query.page) || 1
	const perPage = 12
	const start = (page - 1) * perPage
	const end = page * perPage

	const products = await Product.find()
	const pages = []
	const lastPage = Math.ceil(products.length / perPage)

	if (page === 1) {
		lastPage !== 2 
		? pages.push(1, 2, 3) 
		: pages.push(1, 2)
	}

	if (page === lastPage) {
		lastPage !== 2 
		? pages.push(page - 2, page -1, page) 
		: pages.push(1, 2)
	}

	if (page > 1 && page < lastPage) {
		pages.push(page - 1, page, page + 1)
	}

	res.render('products/index', { 
		products: products.slice(start, end),
		activePage: page,
		pages: pages
	})
}