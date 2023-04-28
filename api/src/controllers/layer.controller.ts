import { DataSource } from "typeorm";
import { BaseController } from "./base.controller";
import { Layer, Map } from "../entities";
import authMiddleware from "../middlewares/auth.middleware";

class LayerController extends BaseController<Layer> {
  constructor(dataSource: DataSource) {
    super("/maps", dataSource, dataSource.getRepository(Layer));
  }

  protected initializeRoutes(): void {
    this.router.use(authMiddleware);
  }

  protected async createLayer(map: Map) {
    try {
      const layer = new Layer();
      layer.map = map;

      await layer.save();
      return layer;
    } catch (err) {
      console.error(err);
    }
  }
}

export default LayerController;
