if (process.env.NODE_ENV !== "production") require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");

const { getRefreshToken } = require("./utils/authenticate");

const username = process.env.FIRST_USER_EMAIL;
const name = process.env.FIRST_USER_NAME;
const password = process.env.FIRST_USER_PASSWORD;

mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => {
    console.log("DB CONNECTED");

    User.findOne({ username }).then((user) => {
      if (!user) {
        User.register(
          new User({
            username,
            name,
            active: true,
          }),
          password,
          (err, user) => {
            const refreshToken = getRefreshToken({ _id: user._id });

            user.refreshToken.push({ refreshToken });

            user.save(() => process.exit());
            console.log("Berhasil didaftarkan !");
          }
        );
      } else {
        console.log("Sudah terdaftar !");
        process.exit();
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
