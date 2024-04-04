// const onboardingService = require('../services/onboardingService');

// exports. = async (req, res) => {
//   try {
//     const userData = req.body;
//     const newUser = await onboardingService.registerUser(userData);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const credentials = req.body;
//     const user = await onboardingService.loginUser(credentials);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
