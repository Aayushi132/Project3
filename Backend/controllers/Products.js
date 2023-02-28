const mongoose = require('mongoose')
const product = require('../models/productInfo.js');

var exports = module.exports = {};

exports.products = async() => {
    return product.find({})
}