const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/user-model");
const { jwtSecret, hashRounds } = require("../config/secrets");

// for /api/auth

router.post("/register", (req, res) => {
  let user = req.body;

  // const ROUNDS = process.env.HASHING_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, hashRounds);
  user.password = hash;

  Users.add(user)
    .then((saved) => {
      const token = generateToken(saved);
      res.status(201).json({
        message: `Welcome ${user.username}!`,
        token
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "error registering user", err });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
          user
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Error logging in" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
