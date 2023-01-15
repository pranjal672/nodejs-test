const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origins = req.headers.origins;
  if (allowedOrigins.includes(origins)) {
    res.headers("Access-Control-Allowed-Credentials", true);
  }
  next();
};

module.exports = credentials;
