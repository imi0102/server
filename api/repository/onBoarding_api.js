const FamilyMemberModel = require("../../models/family_member_model");
const LoginModel = require("../../models/login_model");
const FamilyCodeModel = require("../../models/family_code_model");
const ResponseModel = require("../../models/response_model");
const StringConstants = require("../constants/string_constants");
const JWTUtils = require("../JWTUtils");

// Register Admin Member
exports.createAdminAccount = async (req, res) => {
  try {
    var userData = req.body;
    // Check if a user with the same email already exists
    const existingUser = await FamilyMemberModel.findOne({ email: userData.email });

    if (existingUser) {
      return res.status(400).json(ResponseModel.error(StringConstants.FAMILY_MEMBER_ALREADY_EXISTS, 400));
    }
    const existingFamilyCode = await FamilyCodeModel.findOne({ familyCode: userData.familyCode });

    if (existingFamilyCode) {
      return res.status(400).json(ResponseModel.error(StringConstants.FAMILY_CODE_ALREADY_EXISTS, 400));
    }
    // Create a new family code document
    const familyCodeModel = new FamilyCodeModel({ familyCode: userData.familyCode });
    await familyCodeModel.save();

    userData.familyCodeId = familyCodeModel.id;
    // Create a new instance of the User model using the parsed JSON data
    const newUser = new FamilyMemberModel(userData);
    // Save the new user to the database
    await newUser.save();

     // Generate JWT token for the logged-in user
     const token = JWTUtils.generateToken({ userId: newUser.id });

     // Return user data and token in the response
     res.status(200).json(ResponseModel.success({ newUser, token }, StringConstants.FAMILY_MEMBER_REGISTERED_SUCCESSFULLY));
  } catch (error) {
    console.error("Error registering Admin:", error);
    res.status(500).json(ResponseModel.error(error));
  }
}

// Register Family Membets
exports.createFamilyMemberAccount = async (req, res) => {
  try {

    const token = req.headers.authorization; // Get the JWT token from the request headers

    // Verify the JWT token
    const decodedToken = JWTUtils.verifyToken(token);
    if (!decodedToken) {
      return res.status(401).json(ResponseModel.error("Invalid Token", 401));
    }

    var userData = req.body;

    // Check if a user with the same email already exists
    const existingUser = await FamilyMemberModel.findOne({ email: userData.email });

    if (existingUser) {
      return res.status(400).json(ResponseModel.error(StringConstants.FAMILY_MEMBER_ALREADY_EXISTS, 400));
    }

    // Create a new instance of the User model using the parsed JSON data
    const newUser = new FamilyMemberModel(userData);
    // Save the new user to the database
    await newUser.save();

    // Generate a new token with updated expiration time
    const updatedToken = JWTUtils.generateToken({ userId: decodedToken.memberId });
    console.log("newToken::", updatedToken);
    // Send the new token in the response headers
    res.setHeader('Authorization', updatedToken);

    res.status(200).json(ResponseModel.success(newUser, StringConstants.FAMILY_MEMBER_REGISTERED_SUCCESSFULLY));
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json(ResponseModel.error(error));
  }
}

//Add Family Code
exports.addFamilyCode = async (req, res) => {
  try {
    const { familyCode } = req.body;

    // Check if the family code already exists
    const existingFamilyCode = await FamilyCodeModel.findOne({ familyCode });

    if (existingFamilyCode) {
      res.status(400).json(ResponseModel.error(StringConstants.FAMILY_CODE_ALREADY_EXISTS, 400));
    }

    // Create a new family code document
    const newFamilyCode = new FamilyCodeModel({ familyCode });
    await newFamilyCode.save();
    res.status(200).json(ResponseModel.success(newFamilyCode, StringConstants.FAMILY_CODE_ADDED_SUCCESSFULLY));
  } catch (error) {
    console.error('Failed to add family code:', error);
    res.status(500).json(ResponseModel.error(error));
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in database
    const user = await LoginModel.findOne({ email });
    if (!user) {
      return res.status(404).json(ResponseModel.error(StringConstants.PLEASE_CHECK_YOUR_CREDENTIALS_FAMILY_MEMBER_NOT_FOUND, 400));
    }

    // Check password
    const passwordMatch = user.password === password;
    if (passwordMatch) {

      // Generate JWT token for the logged-in user
      const token = JWTUtils.generateToken({ userId: user.id });

      // Return user data and token in the response
      res.status(200).json(ResponseModel.success({ user, token }, StringConstants.LOGIN_SUCCESSFUL));
    } else {
      res.status(401).json(ResponseModel.error(StringConstants.INVALID_PASSWORD, 401));
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json(ResponseModel.error(error));
  }
}

//Get Family Members
exports.getFamilyMembers = async (req, res) => {
  try {
    const token = req.headers.authorization; // Get the JWT token from the request headers

    // Verify the JWT token
    const decodedToken = JWTUtils.verifyToken(token);
    console.log("decodedToken::", decodedToken);
    if (!decodedToken) {
      return res.status(401).json(ResponseModel.error("Invalid Token", 401));
    }

    var { familyCodeId } = req.query;

    // Find family members based on family code ID and user role
    const familyMemberData = await FamilyMemberModel.find({
      familyCodeId: familyCodeId,
      role: StringConstants.USER_ROLE,
    });

    if (!familyMemberData || familyMemberData.length === 0) {
      return res.status(404).json(ResponseModel.error('Family Members not found', 404));
    }

    // Generate a new token with updated expiration time
    const newToken = JWTUtils.generateToken({ userId: decodedToken.userId });

    // Send the new token in the response headers
    res.setHeader('Authorization', newToken);

    res.status(200).json(ResponseModel.success(familyMemberData));
  } catch (error) {
    console.error("Error getFamilyMembers:", error);
    res.status(500).json(ResponseModel.error('Error getting Family Members'));
  }
};
