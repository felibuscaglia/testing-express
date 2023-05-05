import { DataSource } from "typeorm";
import { BaseController } from "./base.controller";
import { Layer } from "../entities";
import authMiddleware from "../middlewares/auth.middleware";
import { RequestWithUser, RequestWithUserAndMap } from "types/UserDto.type";
import { Response } from "express";
import mapMiddleware from "../middlewares/map.middleware";

class LayerController extends BaseController<Layer> {
  constructor(dataSource: DataSource) {
    super("/layers", dataSource, dataSource.getRepository(Layer));
  }

  protected initializeRoutes(): void {
    this.router.use(authMiddleware);
    this.router.use(mapMiddleware);
    this.router.post(
      "/",
      async (req: RequestWithUserAndMap, res: Response) =>
        await this.createLayer(req, res)
    );
  }

  private async createLayer(req: RequestWithUserAndMap, res: Response) {
    try {
      const layer = new Layer();

      layer.mapId = req.map.id;

      await this.repository.save(layer);
      return res.status(201).send({ layer });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Unable to create a new layer." });
    }
  }
}

export default LayerController;
