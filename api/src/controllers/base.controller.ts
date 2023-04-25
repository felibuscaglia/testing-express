import { Router } from "express";
import { DataSource, Repository } from "typeorm";

export abstract class BaseController<T> {
  private readonly path: string;
  protected readonly router: Router;
  protected readonly dataSource: DataSource;
  protected readonly repository: Repository<T>;

  constructor(path: string, dataSource: DataSource, repository: Repository<T>) {
    this.path = path;
    this.router = Router();
    this.dataSource = dataSource;
    this.repository = repository;

    this.initializeRoutes();
  }

  protected abstract initializeRoutes(): void;

  public getRouter() {
    return this.router;
  }

  public getPath() {
    return this.path;
  }
}
