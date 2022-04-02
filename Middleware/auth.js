const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            error: "Failed to authenticate token",
          });
        }
        req.userId = decoded.id;
        next();
      });
    } else {
      return res.status(403).json({
        error: "Unauthorized user!",
      });
    }
  } catch (error) {
    return res.status(403).json({
      error: "Unauthorized user!",
    });
  }
};

module.exports = verifyToken;
