/** Convenience middleware to handle common auth cases in routes. */

const jwt = require('jsonwebtoken');
const { SECRET } = require('../../frontend/src/secret');

/** Middleware to use when they must provide a valid token.
 *
 * Add username onto req as a convenience for view functions.
 *
 * If not, raises Unauthorized.
 *
 */

function authenticateUser(req, res, next) {
  try {
    const tokenStr = req.body._token || req.query._token;
    let token = jwt.verify(tokenStr, SECRET);
    req.name = token.name;
    req.email = token.email;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateUser
};
