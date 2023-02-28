const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    address: String,
    FbLoginID: String
})

const User = mongoose.model('UsersInfo', userSchema, 'UsersInfo')// first is collection name and second is schema name third we need to add collection name agai since mongo adds 's' in the end of collections

module.exports = User