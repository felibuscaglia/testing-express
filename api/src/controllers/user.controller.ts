import { User } from "entities";
import { Router, Response } from "express";
import { SignUpRequest } from "types/UserDto.type";

class UserController {
  public readonly path = "/users";
  public readonly router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(
      "/",
      async (req: SignUpRequest, res: Response) => await this.signUp(req, res)
    );
    // this.router.use(this.validateInput);
    // Controller endpoints
    // this.router.post(this.path + "/login", this.login);
    // this.router.post(this.path, this.createUser);
    // this.router.get(this.path, this.getAllUsers);
    // this.router.get(this.path + "/:id", this.getUser);
    // this.router.put(this.path + "/:id", this.updateUser);
    // this.router.delete(this.path + "/:id", this.deleteUser);
  }

  private async signUp(req: SignUpRequest, res: Response) {
    try {
      const { password, email } = req.body;

      if (!password || !email) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const existingUser = User.findOneBy({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "A user with that email already exists." });
      }
      
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error." });
    }
  }
}

export default UserController;
