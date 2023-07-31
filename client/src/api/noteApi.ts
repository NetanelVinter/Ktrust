import { Note } from "../models/note";

interface ServerError {
    error: string,
    httpStatus: number
}

export interface NoteInput {
    title: string,
    text?: string
}

export async function fetchData(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response> {
    const response = await fetch(input, init);
    if (response.ok)
        return response;
    else {
        const errorFromServer: ServerError = await response.json();
        const errorMsg = errorFromServer.error;
        throw Error(errorMsg);
    }

}

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData("/api/notes", { method: "GET" });
    return response.json();

}

export async function sendNote(note: NoteInput): Promise<Note> {
    const response = await fetchData("api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    });

    return response.json();
}

export async function updateNote(noteId: string, note: NoteInput) {
    const response = await fetchData("/api/notes/" + noteId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    });

    return response.json();
}


export async function deleteNote(NoteId: string) {
    await fetchData("/api/notes/" + NoteId, {
        method: "DELETE"
    });
}