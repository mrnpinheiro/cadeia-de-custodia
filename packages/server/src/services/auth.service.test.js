const AuthService = require('./auth.service');

const loginValidData = {
  name: 'validName',
  password: 'validPassword',
  passwordHash: 'validPasswordHash',
};
const loginInvalidData = {
  name: 'invalidName',
  password: 'invalidPassword',
  passwordHash: 'invalidPasswordHash',
};

function makeHashService() {
  const hashService = {
    hash: function (data) {
      if (data === loginValidData.password) {
        hashService.hashString = loginValidData.passwordHash;
        return hashService.hashString;
      }
      return loginInvalidData.passwordHash;
    },
    compare: function (data, hash) {
      if (data === loginValidData.password && hash === loginValidData.passwordHash) {
        return true;
      }
      return false;
    },
  };

  return hashService;
}

function makeTokenService() {
  const tokenService = {
    generate: (data) => {
      tokenService.accessToken = 'ValidToken';
      return tokenService.accessToken;
    },
  };

  return tokenService;
}

function makeUserRepository() {
  const userRepository = {
    findOne: (options) => {
      if (options.name === loginInvalidData.name) {
        throw new Error('User not found');
      }
      userRepository.user = true;
      return {
        name: loginValidData.name,
        password: loginValidData.passwordHash,
      };
    },
  };

  return userRepository;
}

function makeAuthService() {
  const hashService = makeHashService();
  const tokenService = makeTokenService();
  const userRepository = makeUserRepository();

  const authService = new AuthService(hashService, tokenService, userRepository);

  return {
    authService,
    hashService,
    tokenService,
    userRepository,
  };
}

describe('User login', () => {
  test('User valid login returns token', async () => {
    const { authService, tokenService, userRepository } =
      makeAuthService();

    const accessToken = authService.login(
      loginValidData.name,
      loginValidData.password
    );

    expect(accessToken).toBeTruthy();
    expect(accessToken).toBe(tokenService.accessToken);
    expect(userRepository.user).toBeTruthy();
  });

  test('User not found throws error', async () => {
    const { authService } = makeAuthService();

    expect(() =>
      authService.login(loginInvalidData.name, loginInvalidData.password)
    ).toThrow();
  });

  test('Invalid password throws error', async () => {
    const { authService } = makeAuthService();

    expect(() =>
      authService.login(loginValidData.name, loginInvalidData.password)
    ).toThrow();
  });
});
