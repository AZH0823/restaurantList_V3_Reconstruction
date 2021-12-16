const express = require('express')
const router = express.Router()
const resList = require('../../models/restaurantList_Todo')

//切到Create Page
router.get('/new', (req, res) => {
  return resList.find()
    .lean()
    .then(restaurants => {
      const temp = [] //暫時存放餐廳種類
      const filiterCategory = restaurants.filter((item) => {
        if (!(temp.includes(item.category))) {
          temp.push(item.category)
          return temp
        }
      })
      res.render('toNew', { category: filiterCategory })
    })
    .catch(error => console.error(error))
})

//新增一筆資料
router.post("/", (req, res) => {
  // console.log(req.body)
  return resList.create(req.body)
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})




//修改餐廳資料
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return resList.findById(id)
    .lean()
    .then(findOneRes => {
      // console.log(findOneRes.category)
      res.render('edit', { findOneRes })
      // console.log(findOneRes)
    })
    .catch(error => console.error(error))
  // console.log('enter edit mode')
})

//取得到修改餐廳後的資料
router.put('/:id', (req, res) => {
  const id = req.params.id
  const edit = req.body
  // console.log(edit.category)
  return resList.findById(id)
    .then(editOneRestaurant => {

      editOneRestaurant.name = edit.name
      editOneRestaurant.name_en = edit.name_en
      editOneRestaurant.category = edit.category
      editOneRestaurant.image = edit.image
      editOneRestaurant.rating = edit.rating
      editOneRestaurant.description = edit.description
      editOneRestaurant.phone = edit.phone
      editOneRestaurant.location = edit.location

      return editOneRestaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${id}`))//跑去該筆資料的Detail 頁面
    .catch(error => console.log(error))


})



//顯示特定店家 Click Detail
router.get('/:id', (req, res) => {
  const resId = req.params.id
  return resList.findById(resId)
    .lean()
    .then(restaurants => res.render('showDetails', { showID: restaurants }))
  // console.log('顯示特定店家 Click Detail')

})

//刪除特定一筆資料
router.delete('/:id', (req, res) => {
  const id = req.params.id

  return resList.findById(id)
    .then(removeRes => {
      if (typeof (removeRes) == null || typeof (removeRes) == undefined) {
        // console.log('無此筆資料')
        return
      }
      removeRes.remove()
    })
    .then(res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router