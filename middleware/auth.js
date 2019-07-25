const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //Get the token from the header
  const token = req.header("x-auth-token");

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorisation denied" });
  }

  //Verify the token - if good then decode it
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user; //will use this in all the protected routes
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
