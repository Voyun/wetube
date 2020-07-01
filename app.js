import "core-js";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter  from "./routers/userRouter"; 
import videoRouter from "./routers/videoRouter";
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));

app.use("/", globalRouter); // join login search home 이런것을 다룰 url 
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app; 