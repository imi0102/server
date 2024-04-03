
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    uId: String,
    familyCode: String,
    familyCodeId: String,
    name: String,
    email: String,
    description: String,
    role: String,
    amount: String,
    remainingWalletBalance: String,
    category: String,
    date: { type: Date, default: Date.now },
    createdDate: { type: Date, default: Date.now }
});

const ExpenseModel = mongoose.model('expense', expenseSchema);
module.exports = ExpenseModel;
