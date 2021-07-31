const cors = require("cors");
const express = require("express");
const passport = require("passport");
const compression = require("compression");
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const { users } = require("./routes");

require("./utils/connectdb");
require("./strategies/Jwt");
require("./strategies/Local");

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const app = express();

app.use(compression());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors(corsOptions));

app.use(passport.initialize());

app.use("/users", users);

module.exports = app;
