import { User } from "../entities";
import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RequestWithUser } from "types/UserDto.type";

interface DecodedToken extends JwtPayload {
  email: string;
}

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as DecodedToken;

    const user = await User.findOne({
      where: {
        email: decodedToken.email,
      },
      select: {
        email: true,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    req.user = user;

    // TODO: Generate a new token every time the token is used

    next();
  } catch (err) {
    // TODO: TokenExpiredError
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
