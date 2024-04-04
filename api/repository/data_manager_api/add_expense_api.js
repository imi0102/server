const  ExpenseModel = require('../../../models/expense_model');
const  ResponseModel = require('../../../models/response_model');
const  StringConstants = require('../../../api/constatns/string_constants');
const  WalletBalanceHistoryModel = require('../../../models/wallet_balance_history_model');
const  updateMemberWalletBalance = require('../../../api/repository/data_manager_api/update_wallet_balance_api');


exports.addExpense = async (req, res) => {
    console.log("Test");
  try {
   
  
    // var userData = req.body;
    // const newUser = new ExpenseModel(userData);
    // // Save the new user to the database
    // await newUser.save();

    var  expenseModel = req.body;

        // Add expense entry
        const newExpense = await ExpenseModel(expenseModel);
        await newExpense.save();
        // Update wallet balance history
        // const walletBalanceHistoryModel = new WalletBalanceHistoryModel();
        // walletBalanceHistoryModel.id = expenseModel.uId;
        // walletBalanceHistoryModel.remainingWalletBalance = expenseModel.remainingWalletBalance || "0";
        // walletBalanceHistoryModel.isUpdateBalanceFromEntry = true;
    
        //  const updatedUser = await updateMemberWalletBalance({
        //    reqModel: walletBalanceHistoryModel,
        //  });

    res.status(200).json(ResponseModel.success(newExpense, StringConstants.FAMILY_MEMBER_REGISTERED_SUCCESSFULLY));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const { ExpenseModel } = require('../../models/expense_model'); 
// const { WalletBalanceHistoryModel } = require('../../models/wallet_balance_history_model'); 
// const { updateMemberWalletBalance } = require('../data_manager_api/update_wallet_balance_api');

// exports.add = async (req, res) => {
//   try {
//     const { expenseModel } = req.body;

//     // Add expense entry
//     const newExpense = await ExpenseModel.create(expenseModel);
//     await newExpense.save();
//     // // Update wallet balance history
//     // const walletBalanceHistoryModel = new WalletBalanceHistoryModel();
//     // walletBalanceHistoryModel.memberId = expenseModel.uId;
//     // walletBalanceHistoryModel.remainingWalletBalance = expenseModel.remainingWalletBalance || "0";
//     // walletBalanceHistoryModel.isUpdateBalanceFromEntry = true;

//     //  const updatedUser = await updateMemberWalletBalance({
//     //    reqModel: walletBalanceHistoryModel,
//     //  });

//    // res.status(200).json(updatedUser);
//    res.status(200).json(newExpense);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
