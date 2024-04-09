const express = require("express");
const { createAdminAccount, createFamilyMemberAccount, addFamilyCode, login, getFamilyMembers } = require("./api/repository/onBoarding_api");
const { addExpense, getExpenseData } = require("./api/repository/expense_api");
const { addUpdateWalletBalance, getWalletBalanceHistory } = require("./api/repository/wallet_balance_api");
const ApiConstants = require("./api/constants/api_constants");

const router = express.Router();

router.get('/', (req, res) => res.send("Express on vercel"));

// CREATE_ADMIN_ACCOUNT
router.post(ApiConstants.CREATE_ADMIN_ACCOUNT, createAdminAccount);

// CREATE_FAMILY_MEMBER_ACCOUNT
router.post(ApiConstants.CREATE_FAMILY_MEMBER_ACCOUNT, createFamilyMemberAccount);

// Login
router.post(ApiConstants.LOGIN_FAMILY_MEMBER, login);

// Add FamilyCode
router.post(ApiConstants.ADD_FAMILY_CODE, addFamilyCode);

// Add Expense
router.post(ApiConstants.ADD_EXPENSE, addExpense);

// Add/Update Wallet Balance
router.post(ApiConstants.UPDATE_MEMBER_WALLET_BALANCE, addUpdateWalletBalance);

// Get Expense Data
router.get(ApiConstants.GET_EXPENSE_DATA, getExpenseData);

// Get Family Members Data
router.get(ApiConstants.GET_FAMILY_MEMBERS, getFamilyMembers);

// Get Wallet Balance History
router.get(ApiConstants.GET_WALLET_BALANCE_HISTORY, getWalletBalanceHistory);

module.exports = router;
