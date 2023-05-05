import { Map, User } from "../entities";
import { Request } from "express";

export type UserDTO = {
  email: string;
  password: string;
};

export type SignInDTO = {
  email: string;
  password: string;
};

export type SignUpRequest = Request<{}, {}, UserDTO>;
export type SignInRequest = Request<{}, {}, SignInDTO>;
export type RequestWithUser = Request & { user: User };
export type RequestWithUserAndMap = Request & { user: User; map: Map };
