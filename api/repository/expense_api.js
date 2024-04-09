const ExpenseModel = require('../../models/expense_model');
const ResponseModel = require('../../models/response_model');
const StringConstants = require('../constants/string_constants');
const FamilyMemberModel = require('../../models/family_member_model');
const JWTUtils = require("../JWTUtils");
//Add Expesne
exports.addExpense = async (req, res) => {
  try {
    const token = req.headers.authorization; // Get the JWT token from the request headers

    // Verify the JWT token
    const decodedToken = JWTUtils.verifyToken(token);
    if (!decodedToken) {
      return res.status(401).json(ResponseModel.error("Invalida Token", 401));
    }

    var expenseModel = req.body;
    // Add expense entry
    const newExpense = await ExpenseModel(expenseModel);
    await newExpense.save();

    // Update wallet balance
    const { memberId, remainingWalletBalance } = expenseModel;
    await FamilyMemberModel.updateOne(
      { _id: memberId },
      { $set: { walletBalance: remainingWalletBalance } }
    );

    // Generate a new token with updated expiration time
    const updatedToken = JWTUtils.generateToken({ userId: decodedToken.userId });

    // Send the new token in the response headers
    res.setHeader('Authorization', updatedToken);

    res.status(200).json(ResponseModel.success(newExpense, StringConstants.EXPENSE_ADDED_SUCCESSFULLY));
  } catch (error) {
    res.status(500).json(ResponseModel.error(error));
  }
};

//Get Expense Data
exports.getExpenseData = async (req, res) => {
  try {
    const token = req.headers.authorization; // Get the JWT token from the request headers

    // Verify the JWT token
    const decodedToken = JWTUtils.verifyToken(token);
    if (!decodedToken) {
      return res.status(401).json(ResponseModel.error("Invalid Token", 401));
    }

    var { id, familyCodeId, role } = req.query;
    var expenseData;

    // Find expense data based on user role
    if (role === StringConstants.ADMIN_ROLE) {
      expenseData = await ExpenseModel.find({
        familyCodeId: familyCodeId,
      });
    } else {
      expenseData = await ExpenseModel.find({
        memberId: id,
        familyCodeId: familyCodeId,
        role: role === StringConstants.USER_ROLE,
      });
    }

    if (!expenseData || expenseData.length === 0) {
      return res.status(404).json(ResponseModel.error(StringConstants.EXPENSE_DATA_NOT_FOUND, 404));
    }

    // Generate a new token with updated expiration time
    const updatedToken = JWTUtils.generateToken({ userId: decodedToken.userId });

    // Send the new token in the response headers
    res.setHeader('Authorization', updatedToken);

    res.status(200).json(ResponseModel.success(expenseData));
  } catch (error) {
    console.error("Error getExpenseData:", error);
    res.status(500).json(ResponseModel.error(error));
  }
}