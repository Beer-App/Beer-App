const express = require('express');
const router  = express.Router();
const User = require('../mdoels/Users')
const Beer = require('../mdoels/Beers')
const Cart = require('../mdoels/Cart')
const Payment = require('../mdoels/Payments')

let dataCart;

router.post('/:id/add', (req, res, next) => {
  const {quantity } = req.body;
  if(quantity == 0) {return res.redirect('/')}
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
  let aggSum = 0;
  dataCart= [];
  Cart.findOne({userId:req.user._id})
  .then(data => {
      if(data) {
      data.products.forEach((val,index) => {
      
       var clone = JSON.parse(JSON.stringify(val))
       clone.total = (clone.price) * (clone.quantity)
       console.log(clone.total,"--P"+clone.price+"---Q:"+clone.quantity)
       dataCart.push(clone)
       console.log(clone)
     })
    }
    console.log(dataCart)
    
    
  }).then(() => {      
    dataCart.forEach(obj => {aggSum += obj.total
    console.log(obj)
    })
    res.render('beer/checkout',{data:dataCart, aggSum:aggSum, user:req.user})
  })
 
  .catch(err => next(err))
})
router.post('/payment',(req,res,next) => {
  
  let paymentId = [];
   //products:{$push:{productId:val.productId,quantity:val.quantity}
     //{$push:{products:{productId:val.productId,quantity:val.quantity}}} 
        console.log(dataCart, '   dataCart')
        Payment.create({userId:req.user._id})
        .then((data)=> {
          console.log(data, " created")
          paymentId.push(data)})
          .then( () => {
            for (let val of dataCart) {
            console.log(paymentId ," vall")
          Payment.findByIdAndUpdate(paymentId,{$push:{products:{productId:val.productId,quantity:val.quantity}}} )
          .then(data => console.log(data, " updated"))
          .then(()=> Cart.findOneAndDelete({userId:req.user._id})
          .then(data => console.log('deleted'))
          )
          .catch(err => next(err))
            }

          })
           res.render('beer/payment', {user:req.user}) 

           //Model.update({_id: id}, obj, {upsert: true, setDefaultsOnInsert: true}, cb)
          /*  for(let val of dataCart) {
           Payment.update({userId:req.user._id},
            {$push:{products:{productId:val.productId,quantity:val.quantity}}},
            {upsert: true})
           .then(data => console.log(data, " updated"))
           .then(()=> Cart.findOneAndDelete({userId:req.user._id}))
           .then(data => console.log('deleted'))
            .catch(err => next(err))
           }
           res.render('beer/payment', {user:req.user}) */

        //.catch(err => next(err))
        //{$push:{products:{productId:val.productId,quantity:val.quantity}}}
        /*console.log(dataCart, " dataCart")
        for (let val of dataCart) {
          console.log(paymentId ," vall")
        Payment.findByIdAndUpdate(paymentId,{$push:{products:{productId:val.productId,quantity:val.quantity}}} )
        .then(data => console.log(data, " updated"))
        .catch(err => next(err))*/
        
        
      


        })
 
router.post('/discard/:id', (req,res,next) => {
  let query;
  //console.log(req.params.id)
  Cart.findOne({ "products": { $elemMatch: {_id:req.params.id} } })
  .then(data => {
    console.log(req.params.id+" this is teh data --->> ",data)
    query = data.products;
  })
  .then(()=> {
    for(let q of query) {
      if(q._id == req.params.id) {
        console.log(q._id, " prmm")
        //Cart.products.pull({_id:req.params.id})
        Cart.findOneAndUpdate({ "products": { $elemMatch: {"_id":req.params.id} }},
        {$pull:{"products":{"_id":req.params.id}} })
        .then(data => console.log(data, "  remove"))
        res.redirect('/checkout')
      }
    }
  })
  .catch(err => next(err))
 
})

router.get('/details/:id', (req,res) => {
  Beer.findById(req.params.id)
  .then(data => res.render('beer/details', {data:data, user:req.user}))
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

  router.get('/history', (req, res) => {
    Payment.find({userId:req.user._id}).populate('products.productId')
    .then(data => {
      res.render('beer/history', {data:data, user:req.user})
      console.log(data, ' history')
    })
  })