import App from "./app";
import UserController from "./controllers/user.controller";

const controllers = [new UserController()];
const app = new App(controllers, Number(process.env.PORT));

app.listen();

export default app;
