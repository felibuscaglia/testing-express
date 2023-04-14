import { CreateUserDTO } from "../dto/CreateUser.dto";
import { User } from "../entities";
import { Router, Response } from "express";
import { SignUpRequest } from "types/UserDto.type";
import { validate } from 'class-validator';

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
      const { email, password } = req.body;
      const errors = await this.validateSignUpRequest(email ?? '', password ?? '');

      if (errors.length) {
        const errorMessages = errors.map(error => Object.values(error.constraints)).flat();
        return res.status(400).json({ message: 'Validation errors', errors: errorMessages });
      }


      const existingUser = User.findOneBy({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "A user with that email already exists." });
      } else {
        const user = new User();
        user.email = email;
        user.password = password;
        await user.save();

        return res.status(201).json({ message: "User created successfully." })
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error." });
    }
  }

  private validateSignUpRequest(email: string, password: string) {
    const createUserDTO = new CreateUserDTO(email, password);
    return validate(createUserDTO);
  }
}

export default UserController;
