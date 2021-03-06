const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String, 
    purchased:[
        {
            products:[{
            productId:{type: 
                Schema.Types.ObjectId,
                ref: 'Beer'
            },
            quantity:{type:Number, default:3}
            }],
            paymentType:{type:String, default:'IBAN'} ,
            totalPaid:Number,
            date:{type:Date, default:Date.now()}
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
