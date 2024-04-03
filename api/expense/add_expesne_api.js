const ExpenseModel = require('../../models/expense_model');

exports.addExpese =  async (req, res) => {
    try {
        //const { username, description, date, amount } = req.body;
        //var reqest = req.body;

         // Create a new user instance
         const data = req.body;
        //  const data = new ExpenseModel({
        //     username: username,
        //     description: description,
        //     date: date,
        //     amount: amount
        //   });
      
          // Save the user to the database
          await data.save();
      
          res.status(201).send("Data Stored successfully");
      } catch (error) {
        console.error("Error Data Stored in:", error);
        res.status(500).send("Error Data Stored");
      }
}