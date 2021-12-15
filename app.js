const express = require('express')
const app = express()

const port = 3000
// npm install method - override
const methodOverride = require('method-override')
// 載入 mongoose cmd:  npm install mongoose@5.9.7
const mongoose = require('mongoose')
const bodyParser = require('body-parser')// 引用 body-parser

const exhbs = require('express-handlebars')
app.engine('handlebars', exhbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')


// setting static files
app.use(express.static('public'))

// import jason data 
// const myResList = require('./restaurant.json')
const resList = require('./models/restaurantList_Todo')

const routes = require('./routes')


// 取得資料庫連線狀態
mongoose.connect('mongodb://localhost/resauant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)





app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})