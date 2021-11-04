class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async login(request, response) {
    try {
      const {name, password} = request.body;

      const responseData = await this.authService.login(name, password);

      return response.status(200).json(responseData);
    } catch(error) {
      let statusCode = 500;

      if (error.message === 'Wrong password') {
        statusCode = 400;
      }

      return response.status(statusCode).json();
    }
  }
}

module.exports = AuthController;