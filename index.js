require('dotenv').config()

const express = require('express')

const port = 3000

app = express()

app.get('/', (req, res) => {
	res.send('Home')
})

app.listen(port, () => console.log(`App is listening on ${port}`))