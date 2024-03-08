const Login = require('./login.js');
const bcrypt = require('bcrypt');

// Login endpoint
exports.login =  async (req, res) => {
    try {
        const { username, password } = req.body;
    
        // Find user in database
        const user = await Login.findOne({ username });
        if (!user) {
          return res.status(404).send("User not found");
        }
    
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          res.send("Login successful");
        } else {
          res.status(401).send("Invalid password");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Error logging in");
      }
}

// Register endpoint
exports.register = async (req, res) =>{
    try {
        const { username, password } = req.body;
    
        // Check if user already exists
        const existingUser = await Login.findOne({ username });
    
        if (existingUser) {
          return res.status(400).send("User already exists");
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user instance
        const newUser = new Login({
          username: hashedPassword,
          password: password
        });
    
        // Save the user to the database
        await newUser.save();
    
        res.status(201).send("User registered successfully");
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user");
      }
}
