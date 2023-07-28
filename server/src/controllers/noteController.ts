import { RequestHandler } from "express";
import NoteModel from "../models/note";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {        
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNoteById: RequestHandler<{NoteId: string}> = async (req, res, next) => {
    const noteId = req.params.NoteId;

    try {
        const note = await NoteModel.findById(noteId).exec();
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

export const createNote: RequestHandler<unknown, unknown, {title: string, text: string}> 
= async (req, res, next) => {
    const titleReq = req.body.title;
    const textReq = req.body.text;    

    try {
        const newNote = await NoteModel.create({
            title: titleReq,
            text: textReq,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};