import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import StatusBar from "./components/StatusBar";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || `http://${window.location.hostname}:5001`;
function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [backendStatus, setBackendStatus] = useState("checking");

  // Check backend health on mount
  useEffect(() => {
    checkBackendHealth();
    fetchNotes();
  }, []);

  const checkBackendHealth = async () => {
    try {
      await axios.get(`${API_BASE_URL}/api/health`);
      setBackendStatus("connected");
    } catch (err) {
      setBackendStatus("disconnected");
    }
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/notes`);
      setNotes(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load notes. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (selectedNote) {
        const response = await axios.put(
          `${API_BASE_URL}/api/notes/${selectedNote.id}`,
          noteData,
        );
        setNotes(
          notes.map((note) =>
            note.id === selectedNote.id ? response.data : note,
          ),
        );
        setSelectedNote(null);
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/api/notes`,
          noteData,
        );
        setNotes([response.data, ...notes]);
      }
      setError(null);
    } catch (err) {
      setError("Failed to save note");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
      if (selectedNote?.id === id) {
        setSelectedNote(null);
      }
      setError(null);
    } catch (err) {
      setError("Failed to delete note");
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📝 Notes Application</h1>
        <p className="subtitle">
          Simple Multi-Service Demo: React + Node.js + PostgreSQL
        </p>
      </header>

      <StatusBar status={backendStatus} />

      <div className="app-container">
        <div className="form-section">
          <NoteForm
            onSave={handleSaveNote}
            selectedNote={selectedNote}
            onCancel={() => setSelectedNote(null)}
          />
        </div>

        <div className="notes-section">
          {error && <div className="error-banner">{error}</div>}

          {loading ? (
            <div className="loading">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="empty-state">
              <p>No notes yet. Create your first note! 🚀</p>
            </div>
          ) : (
            <NoteList
              notes={notes}
              selectedNote={selectedNote}
              onSelect={setSelectedNote}
              onDelete={handleDeleteNote}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
