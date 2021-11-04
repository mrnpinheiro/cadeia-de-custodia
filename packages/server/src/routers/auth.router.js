class AuthRouter {
  constructor(router, controller) {
    this.router = router;
    this.controller = controller;
  }

  initializeRoutes() {
    this.router.post('/login', this.controller.login)
  }
}

module.exports = AuthRouter;
