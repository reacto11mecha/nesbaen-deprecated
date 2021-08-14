const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regex = require("../utils/regex");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const User = new Schema({
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
  refreshToken: {
    type: [Session],
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

User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

module.exports = mongoose.model("User", User);
