import express, { Application } from "express";
import loginRouter from "./src/code/login/login";
import signupRouter from "./src/code/signup/signup";
import userRouter from "./src/code/user/user";
import bodyParser from "body-parser";

const app: Application = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
