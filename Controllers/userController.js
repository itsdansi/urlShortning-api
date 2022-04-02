const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./../Models/user");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user) {
        return res.status(409).json({
          error: "Email is taken already!",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
            newUser.save((err, user) => {
              if (err) {
                return res.status(500).json({
                  error: err,
                });
              } else {
                res.status(201).json({
                  message: "User created",
                });
              }
            });
          }
        });
      }
    });
};

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "Email or password is incorrect",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            error: "Email or password is incorrect",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
            },
            process.env.SECRET,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }
        return res.status(401).json({
          error: "Email or password is incorrect",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

const logout = (req, res) => {};

module.exports = {
  register,
  login,
};
