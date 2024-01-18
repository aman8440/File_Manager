const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = { id: decodedToken.userId };
    next();
  });
};

module.exports = { authenticateUser };

