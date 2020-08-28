import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// dotenv : 데이터베이스에서 어떤 부분을 숨겨놓고 싶을 때 사용

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true, 
        useFindAndModify:false
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = () => console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);