import express, { Request, Response, Application } from "express";
import loginRouter from "./src/code/login/login";

const app: Application = express();
const port = 3000;

app.use("/login", loginRouter);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
