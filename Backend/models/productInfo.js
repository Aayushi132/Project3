const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_name: String,
    product_description: String,
    product_price: Number,
    product_ratings: String,
    product_total_reviews: String
})

const product = mongoose.model('ProductsInfo', productSchema, 'ProductsInfo')// first is collection name and second is schema name third we need to add collection name agai since mongo adds 's' in the end of collections

module.exports = product