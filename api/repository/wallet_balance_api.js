const WalletBalanceHistoryModel = require('../../models/wallet_balance_history_model');
const FamilyMemberModel = require('../../models/family_member_model');
const ResponseModel = require('../../models/response_model');
const StringConstants = require('../constants/string_constants');

// Add / Update Wallet Balance 
exports.addUpdateWalletBalance = async (req, res) => {
  try {
    console.log("addUpdateWalletBalance body: ",req.body);
    var reqModel = req.body;

    // Update balance from Family Member
    await FamilyMemberModel.updateOne(
      { _id: reqModel.id }, // Corrected: Use reqModel.id instead of reqModel.id
      {
        $set: {
          walletBalance: reqModel.isUpdateBalanceFromEntry
            ? reqModel.remainingWalletBalance
            : reqModel.updatedWalletBalance,
        },
      }
    );

   //Add to wallet balance history
    if (reqModel.isUpdateBalanceFromEntry === null || reqModel.isUpdateBalanceFromEntry === false) {
      const newWalletHistory = new WalletBalanceHistoryModel(reqModel);
      await newWalletHistory.save();
    }

    // Retrieve updated user data
    const updatedUserData = await FamilyMemberModel.findOne({ _id: reqModel.id });
   res.status(200).json(ResponseModel.success(updatedUserData, StringConstants.WALLET_BALANCE_UPDATED_SUCCESSFULLY));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Wallet Balance History
exports.getWalletBalanceHistory =  async (req, res) => {
  try {
      var { id } = req.query;
      // Find user in database
      const walletBalanceHistoryData = await WalletBalanceHistoryModel.find({
          memberId:id,
        });
      if (walletBalanceHistoryData == null) {
        return res.status(404).json(ResponseModel.error(StringConstants.WALLET_HISTORY_NOT_FOUND,400));
      }
      res.status(200).json(ResponseModel.success(walletBalanceHistoryData,));
      
    } catch (error) {
      console.error("Error getWalletBalanceHistory in:", error);
      res.status(500).json(ResponseModel.error('Error to getWalletBalanceHistory'));
    }
}
