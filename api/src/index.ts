import App from "./app";
import MapController from "./controllers/map.controller";
import UserController from "./controllers/user.controller";

const controllers = [new UserController(), new MapController()];
const app = new App(controllers, Number(process.env.PORT));

app.listen();

export default app;
