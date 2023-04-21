import App from "./app";
import MapController from "./controllers/map.controller";
import AuthController from "./controllers/auth.controller";

const controllers = [new AuthController(), new MapController()];
const app = new App(controllers, Number(process.env.PORT));

app.listen();

export default app;
