const mongoose = require('mongoose');
const ApiConstants = require('../api/constatns/api_constants');
const { Schema } = mongoose;

const walletBalanceHistorySchema = new Schema({
  id: String,
  memberId: String,
  name: String,
  familyCodeId: String,
  remainingWalletBalance: String,
  updatedWalletBalance: String,
  updatedBy: String,
  createdDate: { type: Date, default: Date.now },
  isUpdateBalanceFromEntry: Boolean,
});

const WalletBalanceHistoryModel = mongoose.model(ApiConstants.WALLET_BALANCE_HISTORY_COLLECTION, walletBalanceHistorySchema);

module.exports = WalletBalanceHistoryModel;
