const { User, ROLES } = require("../models");

const isDuplicatedEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user)
      return res
        .status(400)
        .json({ message: "Email sudah terdaftar!", success: false });

    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};

const checkRoleExisted = (req, res, next) => {
  if (!ROLES.includes(req.body.role))
    return res.status(400).json({
      message: `Role ${req.body.role} tidak pernah ada!`,
      success: false,
    });

  next();
};

module.exports = {
  isDuplicatedEmail,
  checkRoleExisted,
};
