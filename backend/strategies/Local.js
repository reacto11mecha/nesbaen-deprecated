const passport = require("passport");
const User = require("../models/user");
const { Strategy: LocalStrategy } = require("passport-local");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
