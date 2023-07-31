import express, { NextFunction, Request, Response } from "express";
import noteRouter from "./routes/notesRoute";
import userRouter from "./routes/userRoute";
import createHttpError , {isHttpError}from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";
import { requiredAuth } from "./middleware/auth";

const app = express();

app.use(express.json());

app.use(session({
    secret: process.env.ACCESS_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_STRING
    })
}));

app.use("/api/user", userRouter);
app.use("/api/notes",requiredAuth , noteRouter);

// for all endpoints which not exists
app.use((req, res, next) => {
    next(createHttpError(404, "Not Valid EndPoint"));    
})

//Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMsg = "unknown error";
    let errorStatus = 500;

    if (isHttpError(error))
    {        
        errorMsg = error.message;
        errorStatus = error.status;
    }
        
    res.status(errorStatus).json({ error: errorMsg, httpStatus: errorStatus });
})

export default app;