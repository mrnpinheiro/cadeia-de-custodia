const JSONWebTokenService = require('./jsonwebtoken.service');

const criptographyKey = 'CRIPTOGRAPHY_KEY';
const tokenExpiresIn = '1h';

const data = {
  data: 'validData',
};

function makeJSONWebTokenService() {
  const jwtService = new JSONWebTokenService(criptographyKey, tokenExpiresIn);

  return {
    jwtService,
  };
}

describe('JSONWebToken Service', () => {
  test('Generate token returns token', () => {
    const { jwtService } =
      makeJSONWebTokenService();

    const token = jwtService.generate(data);

    expect(token).toBeTruthy();
  });

  test('Verify token returns data', () => {
    const { jwtService } = makeJSONWebTokenService();

    const token = jwtService.generate(data);
    const verifiedData = jwtService.verify(token);

    expect(verifiedData).toBeTruthy();
    expect(verifiedData.data).toBe(verifiedData.data);
  });
});
