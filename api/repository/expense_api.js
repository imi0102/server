const  ExpenseModel = require('../../models/expense_model');
const  ResponseModel = require('../../models/response_model');
const  StringConstants = require('../constants/string_constants');
const  FamilyMemberModel = require('../../models/family_member_model');

//Add Expesne
exports.addExpense = async (req, res) => {
  try {
    var  expenseModel = req.body;
    console.log('Request Body:', expenseModel); // Log the request body
    // Add expense entry
    const newExpense = new ExpenseModel(expenseModel);
    await newExpense.save();
       
    // Update wallet balance
    const { memberId, remainingWalletBalance } = expenseModel;
    await FamilyMemberModel.updateOne(
      { _id: memberId },
      { $set: { walletBalance: remainingWalletBalance } }
    );
    console.log('newExpense:', newExpense); // Log the request body
    res.status(200).json(ResponseModel.success(newExpense, StringConstants.EXPENSE_ADDED_SUCCESSFULLY));
  } catch (error) {
    res.status(500).json({ error: error.message });
  } };

//Get Expense Data
exports.getExpenseData =  async (req, res) => {
  try {
    var { id, familyCodeId,role} = req.query;
    var expenseData;
    // Find expense data for Admin in database
    if(role === StringConstants.ADMIN_ROLE){
     expenseData = await ExpenseModel.find({
       familyCodeId:familyCodeId,
     });
    }else{
     // Find expense data for User in database
     expenseData = await ExpenseModel.find({
       memberId:id,
       familyCodeId:familyCodeId,
       role: role === StringConstants.USER_ROLE,
     });
    }
    if (expenseData == null) {
      return res.status(404).json(ResponseModel.error(StringConstants.EXPENSE_DATA_NOT_FOUND,400));
    }
    res.status(200).json(ResponseModel.success(expenseData,));
    } catch (error) {
     console.error("Error getExpenseData in:", error);
     res.status(500).json(ResponseModel.error('Error to getExpenseData'));
  }
}