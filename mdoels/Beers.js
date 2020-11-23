const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const beerSchema = new Schema({
    name: String,
    price: Number,
    image_url:String,
    description:String,
    tagline:String,

});

const Beer = mongoose.model("Beer", beerSchema);

module.exports = Beer;
