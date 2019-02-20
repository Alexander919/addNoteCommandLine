const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const yargs = require('yargs');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

const argv = yargs
            .command('add', 'Add a new note', {
                title: titleOptions,
                body: bodyOptions
            })
            .command('read', 'Display a note', {
                title: titleOptions
            })
            .command('remove', 'Remove a note', {
                title: titleOptions
            })
            .command('list', 'List all notes')
            .help()
            .argv;

const command = yargs.argv._[0];

let message;

switch(command) {
    case 'add':
        const note = notes.addNote(argv.title, argv.body);
        message = note ? 'Note added: ' : 'Nothing added, note already exists.';
        notes.logNote(note, message);
        break;
    case 'list':
        const allNotes = notes.getAll();
        allNotes.forEach((note, i) => notes.logNote(note, `Note ${i+1}:`));
        console.log(`Total notes: ${allNotes.length}`);
        break;
    case 'read':
        const foundNote = notes.getNote(argv.title);
        message = foundNote ? 'Note found: ' : 'Note not found';
        notes.logNote(foundNote, message);
        break;
    case 'remove':
        const isRemoved = notes.removeNote(argv.title);
        notes.logNote(argv, isRemoved ? 'Removed:' : 'Note not found!');
        break;
    default:
        console.log('Cannot recognize your command');
}