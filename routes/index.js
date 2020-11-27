const express = require('express');
const router  = express.Router();
const Beer = require('../mdoels/Beers')
const Cart = require('../mdoels/Cart')
var mongoose = require('mongoose');
 /*background: #007bff;
  background: linear-gradient(to right, #0062E6, #33AEFF);*/
/* GET home page. */
router.get('/', (req, res, next) => {
  
  Beer.find()
  .then(data => res.render('index', {data,user:req.user}))
  .catch(err => next(err))
  let isCreated;
  if(req.user) {
    Cart.findOne({userId:mongoose.Types.ObjectId(req.user.id)})
    .then(data => {
      if(!data) {
        console.log(data)
       isCreated = data;
      }
    })
    .then( () => {
      if(isCreated !== undefined) {
        console.log(isCreated, " first ")
        Cart.create({userId:req.user._id})
        .then(data => console.log(data, " new cart"))
      }
      
    })
  }
});

module.exports = router;


/*console.log(data, " first ")
        Cart.create({userId:req.user_id})
        .then(data => console.log(data, " new cart"))*/