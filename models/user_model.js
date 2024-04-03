const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    familyCode: String,
    familyCodeId: String,
    role: String,
    profileImageUrl: String,
    walletBalance: String,
    createdDate: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
