const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      products: [
        {
          productId:  mongoose.Schema.Types.ObjectId,
          quantity: Number,
          name: String,
          price: Number
        }
      ],
      active: {
        type: Boolean,
        default: true
      },
      modifiedOn: {
        type: Date,
        default: Date.now
      },
},{ timestamps: true })

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;


