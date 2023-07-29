import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { Note } from './models/note';

function App() {
  const [Notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function getNotes() {
      try {
        const response = await fetch("/api/notes", { method: "GET" });
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    
    getNotes();
  }, []);

  return (
    <div className="App">
      {JSON.stringify(Notes)}
    </div>
  );
}

export default App;
