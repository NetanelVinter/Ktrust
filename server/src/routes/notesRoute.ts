import  express from "express";
import * as NoteController from "../controllers/noteController";


const noteRouter = express.Router();

noteRouter.get("/" , NoteController.getNotes);

noteRouter.get("/:NoteId", NoteController.getNoteById);

noteRouter.post("/", NoteController.createNote);

noteRouter.patch("/:NoteId", NoteController.updateNote);

noteRouter.delete("/:NoteId", NoteController.deleteNote);

export default noteRouter;