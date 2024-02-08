import NoteView from "./NoteView.js";
import NoteAPI from "./NoteAPI.js";

export default class App{
    constructor(root){
        this.notes = [];
        this.activeNote = null;
        this.view = new NoteView(root, this._handlers())

        this._refreshNotes()
    }

    _refreshNotes(){
        const notes = NoteAPI.getNotes();

        this._setNotes(notes)

        if(notes.length > 0){
            this._setActiveNotes(notes[0])
        }
    }
    _setNotes(notes){
        this.notes = notes
        this.view.updateNoteList(notes)
        this.view.updatePreviewVisibility(notes.length > 0)
    }
    _setActiveNotes(note){
        this.view.updateActiveNote(note)
        this.activeNote = note

    }
    _setActiveNotesEdit(note){
        this.activeNote = note
        this.view.updateActiveNoteEdit(note)

    }


    _handlers(){
        return {
            onNoteSelect: (id) => {
                const selectedNote = this.notes.find(note => note.id == id)
                this._setActiveNotes(selectedNote)
            },
            onNoteSelectEdit: (id) => {
                const selectedNote = this.notes.find(note => note.id == id)
                this._setActiveNotesEdit(selectedNote)
            },
            onNoteDelete: (id) => {
                NoteAPI.deleteNotes(id)
                this._refreshNotes()
            },
            onNoteEdit: (newTitle,newBody) => {
                NoteAPI.saveNotes({
                    id: this.activeNote.id,
                    title: newTitle,
                    body: newBody
                })
                this._refreshNotes()
        
            },
            onNoteAdd : () => {
                const newNote = {
                    title: "Title",
                    body: "Take note..."
                }
                NoteAPI.saveNotes(newNote);
                this._refreshNotes()
            }
        }
    }
}