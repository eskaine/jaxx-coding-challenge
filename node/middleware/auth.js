const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(401);
      }

      req.user = decoded.user;
      next();
    });
  } catch (err) {
    res.sendStatus(500);
  }
}

module.exports = authentication;
