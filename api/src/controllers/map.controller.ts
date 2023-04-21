import { Response } from "express";
import { BaseController } from "./base.controller";
import { RequestWithUser } from "types/UserDto.type";
import authMiddleware from "../middlewares/auth.middleware";

class MapController extends BaseController {
  constructor() {
    super("/maps");
  }

  protected initializeRoutes(): void {
    this.router.post(
      "/",
      async (req: RequestWithUser, res: Response) =>
        await this.createMap(req, res)
    );
    this.router.use(authMiddleware);
  }

  private async createMap(req: RequestWithUser, res: Response) {
    console.log({ user: req.user });

    return res.send(200);
  }
}

export default MapController;
