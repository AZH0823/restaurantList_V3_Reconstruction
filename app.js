const express = require('express')
const exhbs = require('express-handlebars')
// npm install method - override
const methodOverride = require('method-override')
const bodyParser = require('body-parser')// 引用 body-parser

//add mongoose
require('./configure/mongoose')

const app = express()
const port = 3000
const routes = require('./routes')


app.engine('handlebars', exhbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')


// setting static files
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})