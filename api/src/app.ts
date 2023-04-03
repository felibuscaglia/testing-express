import express from "express";
import { Connection, DataSource } from "typeorm";
import dotenv from "dotenv";
import dataSource from "../ormConfig.js";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

dotenv.config();
class App {
  public app: express.Application;
  public port: number;
  public connection: DataSource; 

  constructor(controllers: any[], port: number) {
    this.app = express();
    this.port = port;
    this.initializeModels();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private async initializeModels() {
    const connection = new DataSource(dataSource);
    if (!connection) {
      throw new Error("Error connecting to database");
    }
    this.connection = connection;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(cookieParser());
    this.app.use(morgan("dev"));
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default App;
