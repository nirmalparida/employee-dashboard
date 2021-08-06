const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  age: { type: Number, required: true },
  salary: { type: Number, required: true },
});

module.exports = mongoose.model("Employee", postSchema);
