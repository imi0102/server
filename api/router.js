// wiki.js - Wiki route module

const express = require("express");
const login = require("./onboarding/login_api.js");
const register = require("./onboarding/register_api.js");
const addExpense = require("./expense/add_expesne_api.js");
const router = express.Router();

// Login route
router.post("/login",login);
// Register route
router.post("/register", register);
//Add Expense route
router.post("/add_expense",addExpense);

router.get('/',(req, res) => res.send("Express on vercel"));
module.exports = router;
