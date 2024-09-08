const jwt = require('jsonwebtoken');

const verifyToken = async function isAuthenticated(req, res, next) {    
  // Retrieve token from cookies
  const token = req.cookies.token;

  // Check if the token is present
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  // Verify the token
  jwt.verify(token, "RANDOM_ACCESS_TOKEN", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      // Attach decoded user info (id, username, etc.) to the request object
      req.utilisateur = decoded;
      next();
    }
  });
};

module.exports = verifyToken;
