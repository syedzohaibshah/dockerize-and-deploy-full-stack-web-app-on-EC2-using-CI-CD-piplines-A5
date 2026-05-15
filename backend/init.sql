-- Create notes table
CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at DESC);

-- Insert sample data
INSERT INTO notes (title, content) VALUES
  ('Welcome to Notes App', 'This is a simple multi-service application demonstrating React frontend, Node.js backend, and PostgreSQL database.'),
  ('Getting Started', 'You can create, read, update, and delete notes using this application.'),
  ('Architecture Overview', 'Frontend: React.js running on port 3000\nBackend: Node.js Express API on port 5000\nDatabase: PostgreSQL on port 5432');
