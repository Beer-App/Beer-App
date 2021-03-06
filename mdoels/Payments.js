const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    
            userId:{type:Schema.Types.ObjectId,ref:'User'},
            products:[{
            productId:{type: 
                Schema.Types.ObjectId
            },
            quantity:{type:Number}
            }],
            paymentType:{type:String, default:'IBAN'} ,
            date:{type:Date, default:Date.now()}
        
    

});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;