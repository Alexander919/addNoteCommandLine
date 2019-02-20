const fs = require('fs');

function fetchNotes() {
    try {
        const notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch(err) {
        return [];
    }
}
function saveNotes(notes) {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

module.exports = {
    addNote(title, body) {
        const notes = fetchNotes();
        const note = {
            title,
            body
        };
        if (!notes.some(note => note.title === title)) {
            notes.push(note);
            saveNotes(notes);
            return note;
        }
    },
    getAll() {
        return fetchNotes();
    },
    getNote(title) {
        const notes = fetchNotes();
        return notes.find(note => note.title === title);
    },
    removeNote(title) {
        const notes = fetchNotes();
        const filteredNotes = notes.filter(note => note.title !== title);
        saveNotes(filteredNotes);
        return notes.length !== filteredNotes.length;
    },
    logNote(note, message) {
        if (note) {
            console.log(`${message} title: ${note.title} ${ note.body ? `body: ${note.body}`: '' }`);
        } else {
            console.log(message);
        }
    }
};
