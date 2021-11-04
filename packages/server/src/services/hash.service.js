const bcrypt = require('bcrypt');

class HashService {
  constructor (saltRounds) {
    this.saltRounds = saltRounds || 10;
  }

  hash(data) {
    const salt = bcrypt.genSaltSync(this.saltRounds);

    return bcrypt.hashSync(data, salt);
  }

  compare(data, hash) {
    return bcrypt.compareSync(data, hash);
  }
}

module.exports = HashService;
