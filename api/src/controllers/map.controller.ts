import { Response } from "express";
import { BaseController } from "./base.controller";
import { RequestWithUser } from "types/UserDto.type";
import authMiddleware from "../middlewares/auth.middleware";
import { Map } from "../entities";
import { DataSource } from "typeorm";

class MapController extends BaseController {
  constructor(dataSource: DataSource) {
    super("/maps", dataSource);
  }

  protected initializeRoutes(): void {
    this.router.use(authMiddleware);
    this.router.post(
      "/",
      async (req: RequestWithUser, res: Response) =>
        await this.createMap(req, res)
    );
    this.router.get(
      "/",
      async (req: RequestWithUser, res: Response) => await this.getMap(req, res)
    );
  }

  private async createMap(req: RequestWithUser, res: Response) {
    try {
      const map = new Map();
      map.user = req.user;

      await map.save();

      return res.status(201).send({
        mapId: map.id,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Unable to create a new map." });
    }
  }

  private async getMap(req: RequestWithUser, res: Response) {
    try {
      const { mapId = "" } = req.query;

      
    } catch (err) {}
  }
}

export default MapController;
