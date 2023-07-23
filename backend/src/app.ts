import express from "express";
import 'dotenv/config'
import noteRoute from "./routes/note.route"
import cors from 'cors';
import userRoute from "./routes/user.route";
import env from "./utils/ValidateEnv"
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from 'cookie-parser';
import adminroute from "./routes/Admin.route"
import autheticauser from "./utils/VarifyToken"

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: "*",
  credentials: true, // Allow credentials (cookies)
}));
app.use(express.json())
app.use("/", userRoute)
app.use(autheticauser)
app.use("/api/notes", noteRoute)
app.use("/",adminroute)

app.use((req, res, next)=>{
  next (Error("endpoint not found"))
})



export default app;






