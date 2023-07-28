import  express from "express";
import * as NoteController from "../controllers/noteController";

const noteRouter = express.Router();

noteRouter.get("/", NoteController.getNotes);

noteRouter.get("/:NoteId", NoteController.getNoteById);

noteRouter.post("/", NoteController.createNote);

export default noteRouter;