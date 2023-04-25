import { Router } from "express";
import { DataSource } from "typeorm";

export abstract class BaseController {
  public readonly path: string;
  public readonly router: Router;
  public readonly dataSource: DataSource;

  constructor(path: string, dataSource: DataSource) {
    this.path = path;
    this.router = Router();
    this.dataSource = dataSource;

    this.initializeRoutes();
  }

  protected abstract initializeRoutes(): void;
}
