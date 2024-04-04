const express = require("express");
const { login } = require("./api/repository/onboarding/login_api");
const { register } = require("./api/repository/onboarding/registration_api");
const { addFamilyCode } = require("./api/repository/onboarding/family_code_api");
const { addExpense } = require("./api/repository/data_manager_api/add_expense_api");
const { updateWalletBalance } = require("./api/repository/data_manager_api/update_wallet_balance_api");
const ApiConstants = require("./api/constatns/api_constants");

const router = express.Router();

router.get('/',(req, res) => res.send("Express on vercel"));

// CREATE_ADMIN_ACCOUNT
router.post(ApiConstants.CREATE_ADMIN_ACCOUNT, register);

// CREATE_FAMILY_MEMBER_ACCOUNT
router.post(ApiConstants.CREATE_FAMILY_MEMBER_ACCOUNT, register);

// Login
router.post(ApiConstants.LOGIN_FAMILY_MEMBER, login);

// Add FamilyCode
router.post(ApiConstants.ADD_FAMILY_CODE, addFamilyCode);

// Add Expense
router.post(ApiConstants.ADD_EXPENSE, addExpense);

// Add Wallet Balance
router.post(ApiConstants.UPDATE_MEMBER_WALLET_BALANCE, updateWalletBalance);

// Update Wallet Balance
router.post(ApiConstants.UPDATE_MEMBER_WALLET_BALANCE, updateWalletBalance);


module.exports = router;
