import { Request, Response, Router } from "express";
import { BaseController } from "./base.controller";
import { RequestWithUser } from "types/UserDto.type";

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
  }

  private async createMap(req: RequestWithUser, res: Response) {
    console.log({ user: req.user });

    return res.send(200);
  }
}

export default MapController;
