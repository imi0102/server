const mongoose = require('mongoose');
const ApiConstants = require('../api/constatns/api_constants');

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
},{ __v: false });

const FamilyMembers = mongoose.model(ApiConstants.FAMILY_MEMBERS_COLLECTION, familyMembersSchema);
module.exports = FamilyMembers;
