const LoginModel = require("../../../models/login_model");
const ResponseModel = require("../../../models/response_model");

exports.login =  async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Find user in database
        const user = await LoginModel.findOne({ email });
        if (!user) {
          return res.status(404).json(ResponseModel.error('Please check your credentials family member not found',400));
        }
        const passwordMatch = user.password === password;
        // Check password
        if (passwordMatch) {
          res.status(200).json(ResponseModel.success(newFamilyCode, 'Login successful'));
        } else {
          res.status(401).json(ResponseModel.error('Invalid password',401));
        }
      } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json(ResponseModel.error('Error to logging'));
      }
}