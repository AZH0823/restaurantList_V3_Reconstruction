// 載入 mongoose cmd:  npm install mongoose@5.9.7
const mongoose = require('mongoose')


// 取得資料庫連線狀態
mongoose.connect('mongodb://localhost/resauant-list', { useNewUrlParser: true, useUnifiedTopology: true })
//resauant-list : Database 的名稱
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db