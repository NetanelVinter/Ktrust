import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from "./components/noteComp";
import NoteDialog from "./components/addEditNoteComp";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import styles from "./styles/notePage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NotesApi from "./api/noteApi";
import { FaPlus } from "react-icons/fa";

function App() {
  const [Notes, setNotes] = useState<NoteModel[]>([]);

  const [IsShowDialog, setIsShowDialog] = useState<Boolean>(false);

  const [NoteToEdit, setNoteToEdit] = useState<NoteModel | undefined>(undefined);

  const [IsLoadingNotes, setIsLoadingNotes] = useState(false);


  useEffect(() => {
    async function getNotes() {
      try {
        setIsLoadingNotes(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      } finally {
        setIsLoadingNotes(false);
      }
    }

    getNotes();
  }, []);

  async function onDeleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(Notes.filter((n) => n._id !== note._id));
    } catch (error) {
      console.log("get here");
      console.error(error);
      alert(error);
    }
  }

  const notesGrid =
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
      {Notes.map((_note) =>
      (
        <Col key={_note._id}>
          <Note
            note={_note}
            className={styles.note}
            onClickNote={setNoteToEdit}
            onDeleteNote={onDeleteNote}></Note>
        </Col>
      )
      )}
    </Row>

  return (
    <Container className={styles.notePage}>
      <Button className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setIsShowDialog(true)}>
        Add New Note
        <FaPlus />
      </Button>
      { IsLoadingNotes && <Spinner animation='border' variant='primary'/>}
      {
        !IsLoadingNotes && <>
        {Notes.length > 0 ? notesGrid : <p>There are no notes yet</p>}
        </>
      }
      {
        IsShowDialog &&
        <NoteDialog
          onDismiss={() => setIsShowDialog(false)}
          onNoteSaved={(note) => {
            setNotes([...Notes, note])
            setIsShowDialog(false)
          }} />
      }
      {
        NoteToEdit &&
        <NoteDialog
          noteToEdit={NoteToEdit}
          onDismiss={() => setNoteToEdit(undefined)}
          onNoteSaved={(updatedNote) => {
            setNotes(Notes.map(currentNote => currentNote._id === updatedNote._id ? updatedNote : currentNote));
            setNoteToEdit(undefined);
          }}
        />
      }
    </Container>
  );
}

export default App;
