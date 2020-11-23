const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    purchased:[
        {
            quantity: Number,
            product:{type: Schema.Types.ObjectId, ref: 'Beer' }
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
