const express = require("express");
const { login } = require("./api/onboarding/login_api");
const { register } = require("./api/onboarding/registration_api");
const { addFamilyCode } = require("./api/onboarding/family_code_api");

//const {dataEntry} = require("./entry/entry");
const router = express.Router();

//Login
router.post("/login",login);
//Register
router.post("/register",register);
//Add FamilyCode
router.post("/addFamilyCode",addFamilyCode);

router.get('/',(req, res) => res.send("Express on vercel"));
module.exports = router;

// const express = require("express");
// const {login, register} = require("./login_api");

// const {dataEntry} = require("./entry/entry");
// const router = express.Router();

// // Home page route
// router.post("/login",login);
// router.post("/entry",dataEntry);

// // About page route
// router.post("/register", register);

// router.get('/',(req, res) => res.send("Express on vercel"));
// module.exports = router;
