const LoginModel = require('../../models/login_model');

// Login endpoint
exports.login =  async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Find user in database
        const user = await LoginModel.findOne({ email });
        if (!user) {
          return res.status(404).send("User not found");
        }
        const passwordMatch = user.password === password;
        // Check password
        if (passwordMatch) {
          res.send("Login successful");
        } else {
          res.status(401).send("Invalid password");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Error logging in");
      }
}

