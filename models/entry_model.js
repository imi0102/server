const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username    : String,
    description : String,
    date        : String,
    amount      : Number
  });
  var EntryModel = mongoose.model('entry', userSchema);
  module.exports = EntryModel;