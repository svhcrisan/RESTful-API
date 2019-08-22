// this is the model of how my product will look at an individual data level
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    descriprion: {
        type: String,
        required: false,
        default: "Product description"
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true

    }

});

module.exports = mongoose.model('Product', productSchema);