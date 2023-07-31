import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface NoteParam {
    NoteId: string
}

interface NoteBody {
    title?: string,
    text?: string
}

// Helper function for note retrieval
//userId must be valid beacuse of Auth middleware, the undefined here is for not writing as all over.
const noteByIdErrorCheck = async (userId: mongoose.Types.ObjectId | undefined, noteId: string) => {
    if (!mongoose.isValidObjectId(noteId))
        throw createHttpError(400, "Invalid Note Id");

    const note = await NoteModel.findById(noteId).exec();

    if (!note)
        throw createHttpError(400, "Note Not found");

    if (!(note.userId as mongoose.Types.ObjectId).equals(userId as mongoose.Types.ObjectId))
        throw createHttpError(401, "You cannot access this note");

    return note;
};

export const getNotes: RequestHandler = async (req, res, next) => {
    try {  
        const AuthuserId = req.session.userId as mongoose.Types.ObjectId;      
        const notes = await NoteModel.find({userId: AuthuserId}).exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNoteById: RequestHandler<NoteParam> = async (req, res, next) => {
    const noteId = req.params.NoteId;

    try {
        const note = await noteByIdErrorCheck(req.session.userId , noteId);
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

export const createNote: RequestHandler<unknown, unknown, NoteBody>
    = async (req, res, next) => {
        const titleReq = req.body.title;
        const textReq = req.body.text;

        try {
            if (!titleReq) throw createHttpError(400, "Title is missing");

            const newNote = await NoteModel.create({
                userId: req.session.userId,
                title: titleReq,
                text: textReq,
            });

            res.status(201).json(newNote);
        } catch (error) {
            next(error);
        }
    };

export const updateNote: RequestHandler<NoteParam, unknown, NoteBody>
    = async (req, res, next) => {

        const noteId = req.params.NoteId;
        const newTitle = req.body.title;
        const newText = req.body.text;

        try {
            if (!newTitle)
                throw createHttpError(400, "Title is missing");

            const currentNote = await noteByIdErrorCheck(req.session.userId ,noteId);

            currentNote.title = newTitle;
            currentNote.text = newText;

            const newNote = await currentNote.save();
            res.status(200).json(newNote);
        } catch (error) {
            next(error);
        }
    }

export const deleteNote: RequestHandler<NoteParam> = async (req,res,next) => {
    const noteId = req.params.NoteId;

    try {
        const note = await noteByIdErrorCheck(req.session.userId ,noteId);
        note.deleteOne();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}