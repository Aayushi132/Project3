const mongoose = require('mongoose')
const User = require('../models/userInfo.js');

var exports = module.exports = {};

exports.register = async(userreq) => {
    const checkForEmail = await User.findOne({email: userreq.email}).exec();
    const checkForfbID = await User.findOne({FbLoginID: userreq.FbLoginID}).exec();
    const responsePayload = {
        success: 'true',
        responseData: {}
    }
    if(!checkForEmail || !checkForfbID) {
       const user = new User(userreq)
        user.save()
        responsePayload.success = true;
        responsePayload.responseData = userreq;
        return (responsePayload)
    }
    else {
        responsePayload.success = false;
        responsePayload.responseData = userreq;
        return responsePayload
    }
}

exports.login = async(userData) => {
    const checkForUser = await User.findOne({email: userData.email, password: userData.password}).exec();
    const checkforFBUser = await User.findOne({FbLoginID: userData.FbLoginID}).exec()
    const responsePayload = {
        success: 'true',
        responseData: {}
    }
    if(checkForUser || checkforFBUser) {
        responsePayload.success = true;
        responsePayload.responseData = userData;
        return responsePayload
    }
    else {
        responsePayload.success = false;
        responsePayload.responseData = userData;
        return responsePayload

    }
}


exports.addaddress = async(addressData) => {
    try {
    const responsePayload = {
        success: true,
        responseData: {}
    }
      const result = addressData.type ==='userLoggedIn' ? await User.findOneAndUpdate({ email: addressData.email },{ $set: { address: addressData.address } },{ upsert: true, returnOriginal: false }) : await User.findOneAndUpdate({ FbLoginID: addressData.fbLoginD },{ $set: { address: addressData.address } },{ upsert: true, returnOriginal: false }) 
      responsePayload.success = true
      responsePayload.responseData = {message: "New field added successfully!"}
      return responsePayload
    } catch (err) {
      console.log(err);
    }
}

exports.getUserInfo = async(userData) => {
    try {
    const responsePayload = {
        success: true,
        responseData: {}
    }
   const result = userData.type === 'userLogin'? await User.findOne({ email: userData.email }) : await User.findOne({ FbLoginID: userData.fbLoginD })
        responsePayload.success = true
        responsePayload.responseData = result
        return responsePayload
    } catch (err) {
      console.log(err);
    }
}
