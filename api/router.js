// wiki.js - Wiki route module

const express = require("express");
const {login, register} = require("./login_api");
const {register} = require("./register_api");
const {dataEntry} = require("./entry/entry");
const router = express.Router();

// Login route
router.post("/login_api",login);
// Register route
router.post("/register_api", register);
//Add Expense route
router.post("/add_expense_api",dataEntry);

router.get('/',(req, res) => res.send("Express on vercel"));
module.exports = router;
