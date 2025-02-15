const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend

let notes = [];

// Get all notes
app.get("/notes", (req, res) => res.json(notes));

// Add a new note
app.post("/notes", (req, res) => {
  const note = { id: Date.now(), text: req.body.text };
  notes.push(note);
  res.json(note);
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
  notes = notes.filter((note) => note.id != req.params.id);
  res.json({ message: "Note deleted" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
