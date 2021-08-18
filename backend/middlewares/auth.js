const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");

const _templateCheckRole = (requiredRole) => (req, res, next) =>
  User.findById(req.userId).then((user) => {
    Role.find({
      _id: { $in: user.roles },
    }).then((roles) => {
      if (roles.includes(requiredRole)) return next();

      return res.status(403).json({ message: `Anda bukan ${requiredRole}!` });
    });
  });

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token)
    return res
      .status(403)
      .json({ message: "Tidak ada token yang dimasukkan!", success: false });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .json({ message: "Tidak diizinkan!", success: false });

    req.userId = decoded.id;
    next();
  });
};

const isAdmin = _templateCheckRole("admin");
const isTeacher = _templateCheckRole("guru");
const isManager = _templateCheckRole("pengurus");

module.exports = {
  verifyToken,
  isAdmin,
  isTeacher,
  isManager,
};
