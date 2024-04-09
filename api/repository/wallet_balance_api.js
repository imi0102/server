const WalletBalanceHistoryModel = require('../../models/wallet_balance_history_model');
const FamilyMemberModel = require('../../models/family_member_model');
const ResponseModel = require('../../models/response_model');
const StringConstants = require('../constants/string_constants');
const JWTUtils = require("../JWTUtils");

// Add / Update Wallet Balance 
exports.addUpdateWalletBalance = async (req, res) => {
  try {
    const token = req.headers.authorization; // Get the JWT token from the request headers

    // Verify the JWT token
    const decodedToken = JWTUtils.verifyToken(token);
    if (!decodedToken) {
      return res.status(401).json(ResponseModel.error("Invalid Token", 401));
    }

    var reqModel = req.body;
    // Update balance from Family Member
    await FamilyMemberModel.updateOne(
      { _id: reqModel.memberId },
      {
        $set: {
          walletBalance: reqModel.isUpdateBalanceFromEntry
            ? reqModel.remainingWalletBalance
            : reqModel.updatedWalletBalance,
        },
      }
    );

    // Add to wallet balance history if necessary
    if (reqModel.isUpdateBalanceFromEntry === null || reqModel.isUpdateBalanceFromEntry === false) {
      const newWalletHistory = new WalletBalanceHistoryModel(reqModel);
      await newWalletHistory.save();
    }

    // Retrieve updated user data
    const updatedUserData = await FamilyMemberModel.findOne({ _id: reqModel.memberId });
    console.log("User Data:", updatedUserData);
    // Generate a new token with updated expiration time
    const updatedToken = JWTUtils.generateToken({ userId: decodedToken.memberId });
    console.log("newToken::", updatedToken);
    // Send the new token in the response headers
    res.setHeader('Authorization', updatedToken);

    res.status(200).json(ResponseModel.success(updatedUserData, StringConstants.WALLET_BALANCE_UPDATED_SUCCESSFULLY));
  } catch (error) {
    console.error("Error addUpdateWalletBalance:", error);
    res.status(500).json(ResponseModel.error(error));
  }
};

//Get Wallet Balance History
exports.getWalletBalanceHistory = async (req, res) => {
  try {
    const token = req.headers.authorization; // Get the JWT token from the request headers

    // Verify the JWT token
    const decodedToken = JWTUtils.verifyToken(token);
    if (!decodedToken) {
      return res.status(401).json(ResponseModel.error("Invalid Token", 401));
    }

    var { memberId } = req.query;

    // Find wallet balance history data for the member ID
    const walletBalanceHistoryData = await WalletBalanceHistoryModel.find({
      memberId: memberId,
    });

    if (!walletBalanceHistoryData || walletBalanceHistoryData.length === 0) {
      return res.status(404).json(ResponseModel.error(StringConstants.WALLET_HISTORY_NOT_FOUND, 404));
    }

    // Generate a new token with updated expiration time
    const newToken = JWTUtils.generateToken({ userId: decodedToken.userId });

    // Send the new token in the response headers
    res.setHeader('Authorization', newToken);

    res.status(200).json(ResponseModel.success(walletBalanceHistoryData));
  } catch (error) {
    console.error("Error getWalletBalanceHistory:", error);
    res.status(500).json(ResponseModel.error(error));
  }
};
