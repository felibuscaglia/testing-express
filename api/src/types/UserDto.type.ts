import { User } from "../entities";
import { Request } from "express";

export type UserDTO = {
  email: string;
  password: string;
};

export type SignUpRequest = Request<{}, {}, UserDTO>;
export type RequestWithUser = Request & { user: User };
