const express = require('express');
const router  = express.Router();
const User = require('../mdoels/Users')
const Beer = require('../mdoels/Beers')
const Cart = require('../mdoels/Cart')
const Payment = require('../mdoels/Payments')
let dataCart= [];
let aggSum = 0;

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
  Cart.findOne({userId:req.user._id})
  .then(data => {
      data.products.forEach((val,index) => {
      
       var clone = JSON.parse(JSON.stringify(val))
       clone.total = clone.price * clone.quantity
       console.log(val)
       dataCart.push(clone)
     })
   
    
    dataCart.forEach(obj => aggSum += obj.total)
    res.render('beer/checkout',{data:dataCart, aggSum:aggSum})
  })
  .catch(err => next(err))
})
router.post('/payment',(req,res,next) => {
  console.log(aggSum)
  let paymentId = [];
   //products:{$push:{productId:val.productId,quantity:val.quantity}
     
        
        Payment.create({userId:req.user._id})
        .then((data)=> {
          console.log(data, " created")
          paymentId.push(data)})
          .then( () => {
            console.log(dataCart, " dataCart")
            for (let val of dataCart) {
            console.log(paymentId ," vall")
          Payment.findByIdAndUpdate(paymentId,{$push:{products:{productId:val.productId,quantity:val.quantity}}} )
          .then(data => console.log(data, " updated"))
          .catch(err => next(err))
            }

          })
            

          
        //.catch(err => next(err))
        //{$push:{products:{productId:val.productId,quantity:val.quantity}}}
        /*console.log(dataCart, " dataCart")
        for (let val of dataCart) {
          console.log(paymentId ," vall")
        Payment.findByIdAndUpdate(paymentId,{$push:{products:{productId:val.productId,quantity:val.quantity}}} )
        .then(data => console.log(data, " updated"))
        .catch(err => next(err))*/
        
        
      


        })
 



module.exports = router;

/*dataCart.forEach(val => {
    console.log(val.quantity)
    User.findOneAndUpdate({_id:req.user._id}, {$push:{purchased:{products:{$push:{productId:val.productId, quantity:val.quantity} },totalPaid:aggSum}}})
  .then(data => console.log('success'))
  .catch(err => next(err))*/

  /*User.findOneAndUpdate({_id:req.user._id}, {$push:{purchased:{products:{$push:{productId:dataCart.productId, quantity:dataCart.quantity} },totalPaid:aggSum}}})
  .then(data => console.log('success'))
  .catch(err => next(err))*/