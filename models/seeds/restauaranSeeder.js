const mongoose = require('mongoose')
const resTodo = require('../restaurantList_Todo')

const myResList = require('../../restaurant.json').results

const db = require('../../configure/mongoose')


db.once('open', () => {
  console.log('mongodb connected!')

  resTodo.create(myResList).then(() => console.log('restaurantSeeder update'))
    .catch(error => console.log(error))
  // console.log(myResList.results)
})