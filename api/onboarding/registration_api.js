const UserModel = require('../../models/user_model');
const ResponseModel = require("../../models/response_model");

// Register endpoint
exports.register = async (req, res) => {
    console.log("req:: ");
    
    try {
        // Parse JSON data from the request body
        console.log("req:: ",req.body);
        var userData = req.body;

        console.log("email:: ",userData.email);
        // Check if a user with the same email already exists
        const existingUser = await UserModel.findOne({ email: userData.email });

        if (existingUser) {
            return  res.status(400).json(ResponseModel.error('Family memeber already exists',400));
        }

        // Create a new instance of the User model using the parsed JSON data
        const newUser = new UserModel(userData);

        // Save the new user to the database
        await newUser.save();
        res.status(200).json(ResponseModel.success(newFamilyCode, 'Family memeber registered successfully'));
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json(ResponseModel.error('Error registering family memeber'));
    }
}
