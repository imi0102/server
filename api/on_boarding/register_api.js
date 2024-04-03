const UserModel = require('../../models/user_model');

// Register endpoint
exports.register = async (req, res) => {
    try {
        // Parse JSON data from the request body
        const userData = req.body;

        // Check if a user with the same email already exists
        const existingUser = await UserModel.findOne({ email: userData.email });

        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        // Create a new instance of the User model using the parsed JSON data
        const newUser = new UserModel(userData);

        // Save the new user to the database
        await newUser.save();

        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user");
    }
}
