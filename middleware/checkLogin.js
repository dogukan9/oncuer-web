const jwt = require('jsonwebtoken');
const config = require('config');

const checkLogin = (req, res, next) => {
  //get token from header
  const token = req.header('x-auth-token');

  if (!token) {
    res.status(401).json({ msg: 'No authantication' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};

module.exports = checkLogin;
