import express, { NextFunction, Request, Response } from "express";
import noteRouter from "./routes/notesRoute";
import createHttpError , {isHttpError}from "http-errors";

const app = express();

app.use(express.json());

app.use("/api/notes", noteRouter);


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