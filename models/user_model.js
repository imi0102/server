const mongoose = require('mongoose');

const familyMembersSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    familyCode: String,
    familyCodeId: String,
    role: String,
    profileImageUrl:String,
    walletBalance: String,
    date: { type: Date, default: Date.now },
    createdDate: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('family_members', familyMembersSchema);
module.exports = UserModel;
