import express from "express";
import cors from "cors";
import router  from "./routes/user"
import "./config/passport"
import passport from "passport";
import userRouter from "./routes/protectedRoutes";
import campRouter from "./routes/camp";

const app = express()
app.use(express.json())
app.use(passport.initialize());
app.use(cors())

app.use("/api/v1", router)
app.use("/api/v1", userRouter)
app.use("/api/v1", campRouter)


export default app;