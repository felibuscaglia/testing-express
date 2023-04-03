import { Router, Request, Response, NextFunction } from "express";

class UserController {
  public path = "/user";
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    // this.router.use(this.validateInput);
    // Controller endpoints
    // this.router.post(this.path + "/login", this.login);
    // this.router.post(this.path, this.createUser);
    // this.router.get(this.path, this.getAllUsers);
    // this.router.get(this.path + "/:id", this.getUser);
    // this.router.put(this.path + "/:id", this.updateUser);
    // this.router.delete(this.path + "/:id", this.deleteUser);
  }
}

export default UserController;
