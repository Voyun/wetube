/* 알파벳 순으로 import하는 습관 들이기  */
import "core-js";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CokieStore = MongoStore(session);
/*
    Pug과 express에는 view 파일들의 위치에 관한 기본 설정이 있음
    만약 그 설정을 바꾸고 싶다면, 'views' 설정을 바꾸면 됨
    application의 화면이 담긴 디렉토리나 디렉토리의 배열을 입력하면 됨
    html 파일을 저장해야 하는 폴더의 기본 값은 프로젝트 작업 디렉토리+'/views'임

*/

//console.log(process.env.COOKIE_SECRET);

app.use(helmet());
app.set("view engine", "pug"); // view engine 설정값을 pug으로 바꿈
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

/* local 미들웨어 설정 방식 3가지
app.use((req, res, next) => {

})

app.use(function(req, res, next){

})



const localsMiddleware = (req, res, next) =>{

}
*/
app.use(localsMiddleware); // 위치 파악 중요

app.use(routes.home, globalRouter); // join login search home 이런것을 다룰 url
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
