const mongoose = require('mongoose');
const ApiConstants = require('../api/constants/api_constants');
const baseSchema = require('./base_model');

const familyMembersSchema = baseSchema.add({
    name: String,
    email: String,
    password: String,
    familyCode: String,
    familyCodeId: String,
    role: String,
    profileImageUrl:String,
    walletBalance: String
});

const FamilyMembers = mongoose.model(ApiConstants.FAMILY_MEMBERS_COLLECTION, familyMembersSchema);
module.exports = FamilyMembers;
