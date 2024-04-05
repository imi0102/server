const mongoose = require('mongoose');

// Define the base schema
const baseSchema = new mongoose.Schema({
  createdDate: { type: Date, default: Date.now }, // Automatically insert createdDate
}, { _id: true }); // Enable _id for the base schema

// Define a virtual property for "id"
baseSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

baseSchema.pre('save', async function (next) {
  if (this.createdDate === undefined || this.createdDate === null || this.createdDate === '') {
    // Set createdDate to default value only if it's not provided or null
    this.createdDate = new Date();
  }
  next();
});

// Customize the toJSON method to exclude certain fields and map _id to id
baseSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id; // Map _id to id
    delete ret._id; // Exclude _id
    delete ret.__v; // Exclude __v
    // Add other exclusions if needed
  },
});

// Export the base schema for inheritance
module.exports = baseSchema;
