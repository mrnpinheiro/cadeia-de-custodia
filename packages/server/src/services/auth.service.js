class AuthService {
  constructor(hashService, tokenService, userRepository) {
    this.hashService = hashService;
    this.tokenService = tokenService;
    this.userRepository = userRepository;
  }

  login(name, password) {
    const user = this.userRepository.findOne({name});
    if (!user) {
      throw new Error('User not found');
    }

    if (!this.hashService.compare(password, user.password)) {
      throw new Error('Wrong password');
    }

    const accessToken = this.tokenService.generate(user.id);

    return accessToken;
  }
}

module.exports = AuthService;