import "core-js";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter  from "./routers/userRouter"; 
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
const app = express();
/*
    Pug과 express에는 view 파일들의 위치에 관한 기본 설정이 있음
    만약 그 설정을 바꾸고 싶다면, 'views' 설정을 바꾸면 됨
    application의 화면이 담긴 디렉토리나 디렉토리의 배열을 입력하면 됨
    html 파일을 저장해야 하는 폴더의 기본 값은 프로젝트 작업 디렉토리+'/views'임
    
*/
app.set("view engine","pug");  // view engine 설정값을 pug으로 바꿈
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));

app.use(routes.home, globalRouter); // join login search home 이런것을 다룰 url 
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app; 