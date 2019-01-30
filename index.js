require('dotenv').config()

const express = require('express')
const pug = require('pug')
const mongoose = require('mongoose')

const productRoute = require('./routes/product.route')

const port = process.env.PORT || 8000

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })

app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('index')
})

app.use('/products', productRoute)

app.listen(port, () => console.log(`App is listening on ${port}`))