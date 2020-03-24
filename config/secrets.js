module.exports = {
  jwtSecret: process.env.JWT_SECRET || "secrets secrets are no fun",
  hashRounds: process.env.HASHING_ROUNDS || 8,
  port: process.env.PORT || 5000
};
