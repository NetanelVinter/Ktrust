import express, { NextFunction, Request, Response } from "express";
import noteRouter from "./routes/notesRoute";

const app = express();

app.use(express.json());

app.use("/api/notes", noteRouter);


// for all endpoints which not exists
app.use((req, res, next) => {
    next(Error("not found api"));
})

//Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMsg = "unknown error";
    if (error instanceof Error)
        errorMsg = error.message;
    res.status(500).json({ error: errorMsg })
})

export default app;