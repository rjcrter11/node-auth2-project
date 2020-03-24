const router = require("express").Router();
const Users = require("./user-model");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "error retrieving users", err });
    });
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })

    .catch((err) => {
      res.status(500).json({ message: "Error finding user" });
    });
});

router.delete("/:id", checkDepartment("management"), (req, res) => {
  const id = req.params.id;
  Users.remove(id)

    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.json(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "There was an error deleting the user" });
    });
});

router.put("/:id", checkDepartment("management"), (req, res) => {
  const id = req.params.id;
  const edits = req.body;
  Users.update(id, edits)
    .then((editedUser) => {
      if (editedUser) {
        res.status(200).json(editedUser);
      } else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "error updating user" });
    });
});

function checkDepartment(department) {
  return (req, res, next) => {
    if (
      req.decodedToken &&
      req.decodedToken.department &&
      req.decodedToken.department.toLowerCase() === department
    ) {
      next();
    } else {
      res.status(403).json({ message: "Permissions unavailable" });
    }
  };
}

module.exports = router;
