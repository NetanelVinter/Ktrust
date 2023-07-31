import { FunctionComponent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as NoteApi from "../api/noteApi";
import { NoteInput } from "../api/noteApi";
import { Note } from "../models/note";

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
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Title
                        </Form.Label>
                        <Form.Control type="text" placeholder="title" isInvalid={!!errors.title}
                            {...register("title", { required: "Requierd" })} />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Text
                        </Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="text"
                            {...register("text")} />
                    </Form.Group>

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