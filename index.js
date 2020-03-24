const server = require("./api/server");
const { port } = require("./config/secrets");

//const PORT = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n ** Server running on port ${port}`);
});
