import React from 'react';
import './NoteList.css';

function NoteList({ notes, selectedNote, onSelect, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`note-card ${selectedNote?.id === note.id ? 'selected' : ''}`}
          onClick={() => onSelect(note)}
        >
          <div className="note-header">
            <h3>{note.title}</h3>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('Delete this note?')) {
                  onDelete(note.id);
                }
              }}
              title="Delete note"
            >
              🗑️
            </button>
          </div>
          <p className="note-preview">{note.content.substring(0, 100)}...</p>
          <p className="note-date">{formatDate(note.created_at)}</p>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
