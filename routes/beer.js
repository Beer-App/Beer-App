const express = require('express');
const router  = express.Router();
const User = require('../mdoels/Users')
const Beer = require('../mdoels/Beers')
const Cart = require('../mdoels/Cart')


router.post('/:id/add', (req, res, next) => {
  const {quantity } = req.body;
   Beer.findById(req.params.id)
   .then(data => {
     console.log(data.price)
    Cart.updateOne({userId:req.user._id},
      {$push:{products:{quantity:quantity,productId:data._id, price:data.price,name:data.name }}})
      .then((data) =>{ 
        console.log(data)
        res.redirect('/')
      })
      .catch(err => next(err))
   })
   .catch(err => next(err))

});

router.get('/checkout', (req,res,next) => {
  let dataModify = []
  Cart.findOne({userId:req.user._id})
  .then(data => {
      data.products.forEach((val,index) => {
      
       var clone = JSON.parse(JSON.stringify(val))
       clone.total = clone.price * clone.quantity
       console.log(val)
       dataModify.push(clone)
     })
    console.log(dataModify)
    res.render('beer/checkout',{data:dataModify})
  })
  .catch(err => next(err))
})
router.get('/payment',(req,res,next) => {

})


module.exports = router;
