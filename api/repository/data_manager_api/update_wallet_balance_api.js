const WalletBalanceHistoryModel = require('../../../models/wallet_balance_history_model');
const FamilyMemberModel = require('../../../models/family_member_model');
const  ResponseModel = require('../../../models/response_model');
const  StringConstants = require('../../../api/constatns/string_constants');

exports.updateWalletBalance = async (req, res) => {
  try {
    const reqModel = req.body;

    // Update balance from Family Member
    await FamilyMemberModel.updateOne(
      { id: reqModel.id }, // Corrected: Use reqModel.id instead of reqModel.id
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
    const updatedUserData = await FamilyMemberModel.findOne({ id: reqModel.id });
   // await updatedUserData.save();
   res.status(200).json(ResponseModel.success(updatedUserData, StringConstants.FAMILY_MEMBER_REGISTERED_SUCCESSFULLY));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
