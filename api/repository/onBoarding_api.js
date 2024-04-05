const FamilyMemberModel = require("../../models/family_member_model");
const LoginModel = require("../../models/login_model");
const FamilyCodeModel = require("../../models/family_code_model");
const ResponseModel = require("../../models/response_model");
const StringConstants = require("../constants/string_constants");

// Register Family Membets
exports.registerFamilyMember = async (req, res) => {    
    try {
        var userData = req.body;
        
        // Check if a user with the same email already exists
        const existingUser = await FamilyMemberModel.findOne({ email: userData.email });

        if (existingUser) {
            return res.status(400).json(ResponseModel.error(StringConstants.FAMILY_MEMBER_ALREADY_EXISTS,400));
        }

        // Create a new instance of the User model using the parsed JSON data
        const newUser = new FamilyMemberModel(userData);

        // Save the new user to the database
        await newUser.save();
        res.status(200).json(ResponseModel.success(newUser, StringConstants.FAMILY_MEMBER_REGISTERED_SUCCESSFULLY));
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json(ResponseModel.error(StringConstants.ERROR_REGISTERING_FAMILY_MEMBER));
    }
}

//Add Family Code
exports.addFamilyCode = async (req, res) => {
    try {
        const { familyCode } = req.body;

        // Check if the family code already exists
        const existingFamilyCode = await FamilyCodeModel.findOne({ familyCode });

        if (existingFamilyCode) {
            res.status(400).json(ResponseModel.error( StringConstants.FAMILY_CODE_ALREADY_EXISTS, 400));
        }

        // Create a new family code document
        const newFamilyCode = new FamilyCodeModel({ familyCode });
        await newFamilyCode.save();
        res.status(200).json(ResponseModel.success(newFamilyCode, StringConstants.FAMILY_CODE_ADDED_SUCCESSFULLY));
    } catch (error) {
        console.error('Failed to add family code:', error);
        res.status(500).json(ResponseModel.error('Failed to add family code'));
    }
};

// Login
exports.login =  async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Find user in database
        const user = await LoginModel.findOne({ email });
        if (!user) {
          return res.status(404).json(ResponseModel.error( StringConstants.PLEASE_CHECK_YOUR_CREDENTIALS_FAMILY_MEMBER_NOT_FOUND,400));
        }
        const passwordMatch = user.password === password;
        // Check password
        if (passwordMatch) {
          res.status(200).json(ResponseModel.success(user, StringConstants.LOGIN_SUCCESSFUL));
        } else {
          res.status(401).json(ResponseModel.error(StringConstants.INVALID_PASSWORD,401));
        }
      } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json(ResponseModel.error('Error to logging'));
      }
}

//Get Family Members
exports.getFamilyMembers =  async (req, res) => {
    try {
        var { familyCodeId } = req.query;
    
        // Find user in database
        const familyMemberData = await FamilyMemberModel.find({
            familyCodeId:familyCodeId,
            role: StringConstants.USER_ROLE,
          });
        if (familyMemberData == null) {
          return res.status(404).json(ResponseModel.error('Family Members not found',400));
        }
        res.status(200).json(ResponseModel.success(familyMemberData,));
        
      } catch (error) {
        console.error("Error getFamilyMembers in:", error);
        res.status(500).json(ResponseModel.error('Error to getFamilyMembers'));
      }
}
