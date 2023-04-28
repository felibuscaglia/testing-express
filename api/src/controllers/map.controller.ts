import { Response } from "express";
import { BaseController } from "./base.controller";
import { RequestWithUser } from "types/UserDto.type";
import authMiddleware from "../middlewares/auth.middleware";
import { Layer, Map } from "../entities";
import { DataSource, Repository } from "typeorm";

class MapController extends BaseController<Map> {
  private readonly layerRepository: Repository<Layer>;

  constructor(dataSource: DataSource) {
    super("/maps", dataSource, dataSource.getRepository(Map));
    this.layerRepository = dataSource.getRepository(Layer);
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
      const baseLayer = new Layer();

      map.user = req.user;
      baseLayer.map = map;

      await this.repository.save(map);
      await this.layerRepository.save(baseLayer);

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

      const map = await this.findMapById(mapId, req.user.id, true);

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

      const map = await this.findMapById(mapId, req.user.id, false);

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

  private findMapById(id: string, userId: string, withLayers: boolean) {
    return this.repository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
      relations: withLayers ? ['layers'] : [],
    });
  }
}

export default MapController;
