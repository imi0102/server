const jwt = require('jsonwebtoken');
const secretKey = 'fe865e06b23e3eb9e4d26d49e3d7f578dfdaebf7a6638edf0b43a9917d870b9c';
const { JsonWebTokenError } = require('jsonwebtoken');

class JWTUtils {

  static generateToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, secretKey, { expiresIn });
  }

  static verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw "Invalid Token";
      }
      throw error;
    }
  }
}

module.exports = JWTUtils;

