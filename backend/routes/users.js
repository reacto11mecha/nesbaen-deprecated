const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();
const User = require("../models/user");

const {
  getToken,
  verifyUser,
  COOKIE_OPTIONS,
  getRefreshToken,
} = require("../utils/authenticate");

router.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.username, name: req.body.name }),
    req.body.password,
    (err, user) => {
      if (err) return res.status(500).send(err);

      const token = getToken({ _id: user._id });
      const refreshToken = getRefreshToken({ _id: user._id });

      user.refreshToken.push({ refreshToken });

      user.save((err, user) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          res.send({ success: true, token });
        }
      });
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  const refreshToken = getRefreshToken({ _id: req.user._id });

  User.findById(req.user._id).then(
    (user) => {
      user.refreshToken.push({ refreshToken });

      user.save((err, user) => {
        if (err) return res.status(500).send(err);

        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
        res.send({ success: true, token });
      });
    },
    (err) => next(err)
  );
});

router.get("/me", verifyUser, (req, res) => res.send(req.user));

router.get("/logout", verifyUser, (req, res) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  User.findById(req.user._id).then(
    (user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );

      if (tokenIndex !== -1)
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();

      user.save((err, user) => {
        if (err) return res.status(500).send(err);

        res.clearCookie("refreshToken", COOKIE_OPTIONS);
        res.send({ success: true });
      });
    },
    (err) => next(err)
  );
});

module.exports = router;
