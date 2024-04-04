const mongoose = require('mongoose');
const ApiConstants = require('../api/constatns/api_constants');

const expenseSchema = new mongoose.Schema({
  id:String,
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
  date: Date,
  createdDate: { type: Date, default: Date.now },
});

const ExpenseModel = mongoose.model(ApiConstants.EXPENSE_COLLECTION, expenseSchema);

module.exports = ExpenseModel;
