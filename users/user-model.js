const db = require("../data/db-config");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

function find() {
  return db("users").select("id", "username", "password", "department");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then((ids) => {
      const [id] = ids;
      return findById(id);
    });
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

function update(id, changes) {
  console.log("update function", id, changes);
  return db("users")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}
