import express  from "express";
import { config } from "dotenv";
import morgan from 'morgan'
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
config();

const app = express();

// middlewares
app.use(cors({origin:'http://localhost:5173', credentials: true})) // now we can access this server from this domain
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET)) // this will enable the app to use http cookies to send tokens. This also uses the cookie secret key from .env
app.use(morgan("dev")) // The request is coming via this
app.use('/api/v1', appRouter) // this will take us to the appRouter which belongs in routers -> index.js

export default app;