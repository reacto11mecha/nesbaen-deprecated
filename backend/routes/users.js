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
  User.findOne({ username }).then((user) => {
    if (!user) {
      User.register(
        new User({ username: req.body.username, name: req.body.name }),
        req.body.password,
        (err, user) => {
          if (err) return res.status(500).send(err);

          const token = getToken({ _id: user._id });
          const refreshToken = getRefreshToken({ _id: user._id });

          user.refreshToken.push({ refreshToken });

          user.save((error, user) => {
            if (error) return res.json({ success: false, error });

            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            res.send({ success: true, token });
          });
        }
      );
    }
  });
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  const refreshToken = getRefreshToken({ _id: req.user._id });

  User.findById(req.user._id).then(
    (user) => {
      user.refreshToken.push({ refreshToken });

      user.save((error, user) => {
        if (error) return res.json({ success: false, error });

        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
        res.json({ success: true, token });
      });
    },
    (err) => next(err)
  );
});

router.get("/me", verifyUser, (req, res) => res.json(req.user));

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

      user.save((error, user) => {
        if (error) return res.json({ success: false, error });

        res.clearCookie("refreshToken", COOKIE_OPTIONS);
        res.json({ success: true });
      });
    },
    (err) => next(err)
  );
});

module.exports = router;
