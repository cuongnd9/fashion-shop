require('dotenv').config()

const express = require('express')
const pug = require('pug')

const port = 8000

app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('index')
})

app.listen(port, () => console.log(`App is listening on ${port}`))