const jwt = require('jsonwebtoken');

class JSONWebTokenService {
  constructor(criptographyKey, expiresIn) {
    this.criptographyKey = criptographyKey;
    this.expiresIn = expiresIn || '1h';
  }

  generate(data) {
    return jwt.sign(data, this.criptographyKey, { expiresIn: this.expiresIn });
  }

  verify(token) {
    return jwt.verify(token, this.criptographyKey);
  }
}

module.exports = JSONWebTokenService;
