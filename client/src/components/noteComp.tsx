import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note"
import styles from "../styles/Note.module.css";
import stylesUtils from "../styles/utils.module.css";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
    note: NoteModel,
    className?: string,
    onClickNote: (note: NoteModel) => void,
    onDeleteNote: (note: NoteModel) => void
}

const Note = ({ note, className, onClickNote ,onDeleteNote }: NoteProps) => {
    return (
        <Card className={`${styles.noteCard} ${className}`} onClick={() => onClickNote(note)}>
            <Card.Body className={styles.bodyCard}>
                <Card.Title className={stylesUtils.flexCenter}>
                    {note.title}
                    <MdDelete
                        className="text-muted ms-auto"
                        onClick={(event) => {
                            onDeleteNote(note);
                            event.stopPropagation();
                        }} />
                </Card.Title>
                <Card.Text className={styles.textCard}>
                    {note.text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {note.createdAt >= note.updatedAt ? "Created: " + formatDate(note.createdAt) : "Updated: " + formatDate(note.updatedAt)}
            </Card.Footer>
        </Card>
    )
}

export default Note;