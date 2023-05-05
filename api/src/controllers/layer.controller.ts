import { DataSource } from "typeorm";
import { BaseController } from "./base.controller";
import { Layer } from "../entities";
import authMiddleware from "../middlewares/auth.middleware";
import { RequestWithUser } from "types/UserDto.type";
import { Response } from "express";

class LayerController extends BaseController<Layer> {
  constructor(dataSource: DataSource) {
    super("/layers", dataSource, dataSource.getRepository(Layer));
  }

  protected initializeRoutes(): void {
    this.router.use(authMiddleware);
    this.router.post("/", async (req: RequestWithUser, res: Response) =>
      this.createLayer(req, res)
    );
  }

  private async createLayer(req: RequestWithUser, res: Response) {
    // TODO: Create a Map middleware that sets the map in the request and verifies if it belongs to user.
    try {
      const { mapId } = req.body;
      const layer = new Layer();

      layer.mapId = mapId;

      await this.repository.save(layer);
      return res.status(201).send({ layer });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Unable to create a new layer." });
    }
  }
}

export default LayerController;
