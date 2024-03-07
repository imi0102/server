const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router.js');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://adimi0125:adimi0125@clustor0.uinwwnr.mongodb.net/?retryWrites=true&w=majority&appName=clustor0/login', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// // Register endpoint
// app.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if user already exists
//     const existingUser = await Login.findOne({ username });

//     if (existingUser) {
//       return res.status(400).send("User already exists");
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user instance
//     const newUser = new Login({
//       username: username,
//       password: hashedPassword
//     });

//     // Save the user to the database
//     await newUser.save();

//     res.status(201).send("User registered successfully");
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).send("Error registering user");
//   }
// });

// // Login endpoint
// app.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Find user in database
//     const user = await Login.findOne({ username });
//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     // Check password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (isPasswordValid) {
//       res.send("Login successful");
//     } else {
//       res.status(401).send("Invalid password");
//     }
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).send("Error logging in");
//   }
// });

app.use('/v1',router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
