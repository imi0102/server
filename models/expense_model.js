const mongoose = require('mongoose');
const ApiConstants = require('../api/constants/api_constants');
const baseSchema = require('./base_model');

const expenseSchema = new mongoose.Schema({
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

const ExpenseModel = mongoose.model(ApiConstants.EXPENSE_COLLECTION, expenseSchema);

module.exports = ExpenseModel;
