import { FunctionComponent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as NoteApi from "../api/noteApi";
import { NoteInput } from "../api/noteApi";
import { Note } from "../models/note";
import TextInputField from "./form/textInputField";

interface NoteDialogProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void
}

const NoteDialog: FunctionComponent<NoteDialogProps> = ({ noteToEdit, onDismiss, onNoteSaved }: NoteDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>(
        {
            defaultValues: {
                title: noteToEdit?.title || "",
                text: noteToEdit?.text || "",
            }
        }
    );

    async function onSubmit(input: NoteInput) {
        try {
            const noteResponse = noteToEdit ? await NoteApi.updateNote(noteToEdit._id, input)
                : await NoteApi.sendNote(input);
            onNoteSaved(noteResponse);
        } catch (error) {
            alert(error)
        }
    }

    return (
        <Modal show={true} onHide={onDismiss}>
            <Modal.Header closeButton={true}>
                <Modal.Title>
                    {noteToEdit ? "Edit Note" : "Add Note"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />
                    <TextInputField
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NoteDialog;