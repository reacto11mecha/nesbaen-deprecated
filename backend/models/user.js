const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  refreshToken: {
    type: [Session],
  },
  active: Boolean,
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

User.plugin(passportLocalMongoose, {
  usernameUnique: false,
  findByUsername: function (model, queryParameters) {
    queryParameters.active = true;
    return model.findOne(queryParameters);
  },
});

module.exports = mongoose.model("User", User);
