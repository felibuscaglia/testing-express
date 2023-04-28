import { Response } from "express";
import { BaseController } from "./base.controller";
import { RequestWithUser } from "types/UserDto.type";
import authMiddleware from "../middlewares/auth.middleware";
import { Map } from "../entities";
import { DataSource } from "typeorm";

class MapController extends BaseController<Map> {
  constructor(dataSource: DataSource) {
    super("/maps", dataSource, dataSource.getRepository(Map));
  }

  protected initializeRoutes(): void {
    this.router.use(authMiddleware);
    this.router.post(
      "/",
      async (req: RequestWithUser, res: Response) =>
        await this.createMap(req, res)
    );
    this.router.get(
      "/:mapId",
      async (req: RequestWithUser, res: Response) => await this.getMap(req, res)
    );
    this.router.patch(
      "/:mapId/",
      async (req: RequestWithUser, res: Response) =>
        await this.updateMap(req, res)
    );
  }

  private async createMap(req: RequestWithUser, res: Response) {
    try {
      const map = new Map();
      map.user = req.user;

      await this.repository.save(map);

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
      const { mapId = "" } = req.params;

      const map = await this.findMapById(mapId, req.user.id);

      if (!map) {
        return res.status(404).json({ message: "Map not found." });
      }

      return res.json(map);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Unable to get map." });
    }
  }

  private async updateMap(req: RequestWithUser, res: Response) {
    try {
      const { name, description } = req.body;
      const { mapId = "" } = req.params;

      const map = await this.findMapById(mapId, req.user.id);

      if (!map) {
        return res.status(404).json({ message: "Map not found." });
      }

      if (name) {
        map.name = name;
      }

      if (description) {
        map.description = description;
      }

      await map.save();
      return res.status(200).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Unable to update map." });
    }
  }

  private findMapById(id: string, userId: string) {
    return this.repository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });
  }
}

export default MapController;
