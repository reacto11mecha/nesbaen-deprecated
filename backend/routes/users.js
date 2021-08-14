const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", (req, res, next) => {});

router.post("/login", (req, res, next) => {});

router.get("/logout", (req, res) => {});

module.exports = router;
