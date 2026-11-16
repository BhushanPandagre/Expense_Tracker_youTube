const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
}

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 6) {
      return res
        .status(400)
        .json({
          message:
            "name, email aur 6+ character ka password do",
        });
    }

    const exists = await User.findOne({
      email: email.toLowerCase(),
    });
    if (exists) {
      return res
        .status(409)
        .json({ message: "Is email se account pehle se hai" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({
      token: signToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email aur password do" });
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });
    const ok =
      user && (await bcrypt.compare(password, user.password));
    if (!ok) {
      return res
        .status(401)
        .json({ message: "Email ya password galat hai" });
    }

    res.json({
      token: signToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
