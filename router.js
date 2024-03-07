// wiki.js - Wiki route module

const express = require("express");
const {login, register} = require("./login_api");
const {dataEntry} = require("./entry/entry");
const router = express.Router();

// Home page route
router.post("/login",login);
router.post("/entry",dataEntry);

// About page route
router.post("/register", register);

module.exports = router;
