const router = require("express").Router();
const Users = require("./user-model");

// router.get("/", (req, res, next) => {
//   res.send("Users router");
//   next();
// });

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "error retrieving users", err });
    });
});

module.exports = router;
