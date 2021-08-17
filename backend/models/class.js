const mongoose = require("mongoose");

const Class = new mongoose.Schema({
  gradeName: String,
  gradeNumber: Number,
  classNames: [String],
});

module.exports = mongoose.model("Class", Class);
