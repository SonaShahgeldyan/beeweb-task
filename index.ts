import express, { Application } from "express";
import loginRouter from "./src/code/login/login";
import signupRouter from "./src/code/signup/signup";
import userRouter from "./src/code/user/user";
import workspaceRouter from "./src/code/workspaces/workspaces";
import channelRouter from "./src/code/channels/channels";
import bodyParser from "body-parser";

const app: Application = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/user", userRouter);
app.use("/workspaces", workspaceRouter);
app.use("/channels", channelRouter);

app.listen(port, () => {
  console.log(`Server is Running at http://localhost:${port}`);
});
