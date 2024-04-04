const FamilyMembers = require('../../../models/family_member_model');
const ResponseModel = require("../../../models/response_model");
const StringConstants = require("../../constatns/api_constants");

// Register endpoint
exports.register = async (req, res) => {
    console.log("req:: ");
    
    try {
        // Parse JSON data from the request body
        console.log("req:: ",req.body);
        var userData = req.body;

        console.log("email:: ",userData.email);
        // Check if a user with the same email already exists
        const existingUser = await FamilyMembers.findOne({ email: userData.email });

        if (existingUser) {
            return res.status(400).json(ResponseModel.error(StringConstants.FAMILY_MEMBER_ALREADY_EXISTS,400));
        }

        // Create a new instance of the User model using the parsed JSON data
        const newUser = new FamilyMembers(userData);

        // Save the new user to the database
        await newUser.save();
        res.status(200).json(ResponseModel.success(newUser, StringConstants.FAMILY_MEMBER_REGISTERED_SUCCESSFULLY));
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json(ResponseModel.error(StringConstants.ERROR_REGISTERING_FAMILY_MEMBER));
    }
}
