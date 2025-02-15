const noteForm = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");

// Fetch and display notes
async function fetchNotes() {
    const res = await fetch("/notes");
    const notes = await res.json();
    notesList.innerHTML = "";
    notes.forEach(note => {
        const li = document.createElement("li");
        li.innerHTML = `${note.text} <button class="delete-btn" onclick="deleteNote(${note.id})">X</button>`;
        notesList.appendChild(li);
    });
}

// Add a new note
noteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = noteInput.value.trim();
    if (!text) return;

    await fetch("/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    noteInput.value = "";
    fetchNotes();
});

// Delete a note
async function deleteNote(id) {
    await fetch(`/notes/${id}`, { method: "DELETE" });
    fetchNotes();
}

// Load notes on page load
fetchNotes();
