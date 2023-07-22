import express from "express";
import 'dotenv/config'
import noteRoute from "./routes/note.route"
import cors from 'cors';
import userRoute from "./routes/user.route";
import env from "./utils/ValidateEnv"
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

app.use(cors())
app.use(express.json())

// session middelware use
app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge : 60 * 60 * 1000
   },
   rolling : true,
  //  mongodb store
  store : MongoStore.create({
    mongoUrl : env.MONGO_CONNECTION_URI
  })
}))

app.use("/", userRoute)
app.use("/api/notes", noteRoute)

app.use((req, res, next)=>{
  next (Error("endpoint not found"))
})



export default app;






