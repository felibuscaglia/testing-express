import { CreateUserDTO } from "../dto/CreateUser.dto";
import { User } from "../entities";
import { Response } from "express";
import {
  SignInRequest,
  SignUpRequest,
} from "types/UserDto.type";
import { validate } from "class-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BaseController } from "./base.controller";
import authMiddleware from "../middlewares/auth.middleware";

// TODO: Use the AuthGuard only on some routes

class AuthController extends BaseController {
  constructor() {
    super("/auth");
  }

  public initializeRoutes() {
    this.router.post(
      "/signup",
      async (req: SignUpRequest, res: Response) => await this.signUp(req, res)
    );
    this.router.post(
      "/signin",
      async (req: SignInRequest, res: Response) => await this.signIn(req, res)
    );
    this.router.get("/check", authMiddleware, (req, res: Response) =>
      this.checkAuth(res)
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

  private async signIn(req: SignInRequest, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOneBy({ email });

      if (!user) {
        return res.status(401).send({ message: "Invalid email or password." });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).send({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7 days",
      });

      res.cookie("token", token, { httpOnly: true });

      return res.status(200).send({ message: "Logged in successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error." });
    }
  }

  private async signUp(req: SignUpRequest, res: Response) {
    try {
      const { email, password } = req.body;
      const errors = await this.validateSignUpRequest(
        email ?? "",
        password ?? ""
      );

      if (errors.length) {
        const errorMessages = errors
          .map((error) => Object.values(error.constraints))
          .flat();
        return res
          .status(400)
          .json({ message: "Validation errors", errors: errorMessages });
      }

      const existingUser = await User.findOneBy({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "A user with that email already exists." });
      } else {
        const user = new User();
        user.email = email;

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "7 days",
        });

        res.cookie("token", token, { httpOnly: true });

        return res
          .status(200)
          .send({ message: "User created successfully.", token });
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

  private checkAuth(res: Response) {
    return res.status(200).send();
  }
}

export default AuthController;
