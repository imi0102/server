const EntryModel = require('../models/entry_model');

exports.dataEntry =  async (req, res) => {
    try {
        const { username, description, date, amount } = req.body;
    
        // Find user in database
        
         // Create a new user instance
         const data = new EntryModel({
            username: username,
            description: description,
            date: date,
            amount: amount
          });
      
          // Save the user to the database
          await data.save();
      
          res.status(201).send("Data Stored successfully");
      } catch (error) {
        console.error("Error Data Stored in:", error);
        res.status(500).send("Error Data Stored");
      }
}