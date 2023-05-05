import { RequestWithUserAndMap } from "types/UserDto.type";
import { Map } from "../entities";
import { NextFunction, Response } from "express";

const mapMiddleware = async (
  req: RequestWithUserAndMap,
  res: Response,
  next: NextFunction
) => {
  try {
    const mapId = req.query.mapId?.toString();
    const withLayers = req.query.withLayers?.toString();

    if (!mapId.length) {
      return res.status(400).json({ error: "No map ID present in request." });
    }

    const relations = ["user"];

    if (withLayers === "1") {
      relations.push("layers");
    }

    const map = await Map.findOne({
      where: {
        id: mapId,
      },
      relations,
    });

    if (!map) {
      return res.status(404).json({ error: "Map not found." });
    }

    if (map.user?.email !== req.user.email) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    req.map = map;

    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error. '});
  }
};

export default mapMiddleware;
