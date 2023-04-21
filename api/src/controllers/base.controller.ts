import { Router } from "express";

export abstract class BaseController {
  public readonly path: string;
  public readonly router: Router;

  constructor(path: string) {
    this.path = path;
    this.router = Router();

    this.initializeRoutes();
  }

  protected abstract initializeRoutes(): void;
}
