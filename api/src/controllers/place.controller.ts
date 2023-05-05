import { DataSource } from "typeorm";
import { Place } from "../entities";
import { BaseController } from "./base.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { RequestWithUser } from "../types/UserDto.type";
import { Response } from "express";

class PlaceController extends BaseController<Place> {
  constructor(dataSource: DataSource) {
    super("/places", dataSource, dataSource.getRepository(Place));
  }

  protected initializeRoutes(): void {
    this.router.use(authMiddleware);
    this.router.post(
      "/",
      async (req: RequestWithUser, res: Response) =>
        await this.savePlace(req, res)
    );
  }

  private async savePlace(req: RequestWithUser, res: Response) {
    try {
      const place = new Place();

      place.layerId = "";

      await this.repository.save(place);
      return res.status(201).send({ place });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Unable to save place." });
    }
  }
}

export default PlaceController;
