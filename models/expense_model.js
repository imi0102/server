const mongoose = require('mongoose');
const ApiConstants = require('../api/constants/api_constants');
const baseSchema = require('./base_model');

var expenseSchema = baseSchema.add({
  memberId: String,
  familyCode: String,
  familyCodeId: String,
  name: String,
  email: String,
  description: String,
  role: String,
  amount: String,
  remainingWalletBalance: String,
  category: String,
  date: Date
});

var ExpenseModel = mongoose.model(ApiConstants.EXPENSE_COLLECTION, expenseSchema);

module.exports = ExpenseModel;
