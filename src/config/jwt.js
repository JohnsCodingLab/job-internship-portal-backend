/**
 * JWT configuration
 * Centralizes JWT settings so they can be reused across the app
 */

module.exports = {
  secret: process.env.JWT_SECRET,
  expiresIn: "7d",
};
