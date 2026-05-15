import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NoteForm.css';

function NoteForm({ onSave, selectedNote, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSave({ title, content });
      setTitle('');
      setContent('');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h2>{selectedNote ? 'Edit Note' : 'Create New Note'}</h2>

      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="form-input"
      />

      <textarea
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="form-textarea"
        rows="6"
      />

      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          {selectedNote ? 'Update' : 'Create'} Note
        </button>
        {selectedNote && (
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

NoteForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  selectedNote: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
};

NoteForm.defaultProps = {
  selectedNote: null,
};

export default NoteForm;
