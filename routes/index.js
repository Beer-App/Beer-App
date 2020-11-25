const express = require('express');
const router  = express.Router();
const Beer = require('../mdoels/Beers')
const Cart = require('../mdoels/Cart')
let isCreated;
/* GET home page. */
router.get('/', (req, res, next) => {
  Beer.find()
  .then(data => res.render('index', {data}))
  .catch(err => next(err))

  if(req.user) {
    Cart.findOne({userId:req.user._id})
    .then(data => {
      if(!data) {
       isCreated = data;
      }
    })
    .then( () => {
      console.log(isCreated, " first ")
        Cart.create({userId:req.user._id})
        .then(data => console.log(data, " new cart"))

    })
  }
});

module.exports = router;


/*console.log(data, " first ")
        Cart.create({userId:req.user_id})
        .then(data => console.log(data, " new cart"))*/