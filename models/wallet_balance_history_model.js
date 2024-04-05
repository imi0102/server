const mongoose = require('mongoose');
const ApiConstants = require('../api/constants/api_constants');
const baseSchema = require('./base_model');

const walletBalanceHistorySchema = baseSchema.add({
  memberId: String,
  name: String,
  familyCodeId: String,
  remainingWalletBalance: String,
  updatedWalletBalance: String,
  updatedBy: String,
  isUpdateBalanceFromEntry: Boolean
});

const WalletBalanceHistoryModel = mongoose.model(ApiConstants.WALLET_BALANCE_HISTORY_COLLECTION, walletBalanceHistorySchema);

module.exports = WalletBalanceHistoryModel;
