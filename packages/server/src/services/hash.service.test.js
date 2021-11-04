const HashService = require('./hash.service');

const hashRounds = 10;

const message = 'validMessage';

function makeHashService() {
  const hashService = new HashService(hashRounds);

  return {
    hashService,
  };
}

describe('Hash Service', () => {
  test('Hash data returns string', () => {
    const { hashService } =
      makeHashService();

    const hashedMessage = hashService.hash(message);

    expect(hashedMessage).toBeTruthy();
  });

  test('Compare data with hashed data returns true', () => {
    const { hashService } = makeHashService();

    const hashedMessage = hashService.hash(message);

    expect(hashService.compare(message, hashedMessage)).toBeTruthy();
  });
});
