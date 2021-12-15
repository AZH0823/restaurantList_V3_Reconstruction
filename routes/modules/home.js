const express = require('express')
const router = express.Router()
const resList = require('../../models/restaurantList_Todo')
//index 主畫面的取得
router.get('/', (req, res) => {

  return resList.find()
    .lean()
    .sort({ name_en: 'asc' }) //預設a-z順序
    .then(restaurants => res.render('index', { resList: restaurants }))
    .catch(error => console.error(error))
})

//查詢資料
router.get('/search', (req, res) => {
  // 與 index.handlebars name="keyword"
  let keyWord = req.query.keyword.trim().toLowerCase() // 存所查詢的關鍵字
  //先處理排序
  let sort = req.query.sort
  let sortMethod = {}
  // console.log(sort)
  switch (sort) {
    case 'A > Z':
      sortMethod.name_en = 'asc'
      break
    case 'Z > A':
      sortMethod.name_en = 'desc'
      break
    case '餐廳類型':
      sortMethod.category = 'asc'
      break
    case '地區':
      sortMethod.location = 'asc'
      break
    default:
      break
  }
  // console.log(sortMethod)


  return resList.find()
    .lean()
    .sort(sortMethod)
    .then((restaurants) => {
      const filiterResList = restaurants.filter((restaurant) => {
        // 存放符合關鍵字的餐廳清單。清單並不會只有1間; 所以使用filter
        return restaurant.name.trim().toLowerCase().includes(keyWord) || restaurant.category.trim().toLowerCase().includes(keyWord)
      })
      res.render('index', { searchKeyWord: keyWord, resList: filiterResList, sort })
    })
    .catch(error => console.error(error))


})

module.exports = router