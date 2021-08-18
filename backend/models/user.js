const mongoose = require("mongoose");

const regex = require("../utils/regex");

const User = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator: (v) => regex.EmailRegex.test(v),
      message: (props) => `${props.value} bukanlah sebuah email yang valid!`,
    },
    required: [true, "Masukkan email terlebih dahulu"],
  },
  name: {
    type: String,
    required: [true, "Masukkan nama lengkap!"],
    validate: {
      validator: (v) => regex.NameRegex.test(v),
      message: (props) => `${props.value} bukanlah nama yang valid!`,
    },
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  class: {
    grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classess",
    },
    indexClass: Number,
  },
  active: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("User", User);
