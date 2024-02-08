export default class NoteView{
    constructor(root,{ onNoteSelect, onNoteSelectEdit,  onNoteAdd, onNoteEdit, onNoteDelete } = {}){
        
        this.root = root;
        this.onNoteSelect = onNoteSelect
        this.onNoteSelectEdit = onNoteSelectEdit
        this.onNoteAdd = onNoteAdd
        this.onNoteEdit = onNoteEdit
        this.onNoteDelete = onNoteDelete
        this.root.innerHTML = `
        <div id="notesSidebar">
            <button class="addBtn">Add Note</button>
            <div class="noteList">
            </div>
        </div>    
        <div class="notesPreview">
            <h1>Note Taking App</h1>
            <input type="text" class="noteTitleInput" placeholder="New Title">
            <textarea name="" class="noteBodyInput" placeholder="Note Body"></textarea>
            <button class="save">Save Note</button>
        </div> 
        `
        const addBtn = this.root.querySelector(".addBtn");
        const noteTitle = this.root.querySelector(".noteTitleInput");
        const noteBody = this.root.querySelector(".noteBodyInput");
        const saveNote = this.root.querySelector(".save");

        addBtn.addEventListener('click', () =>{
            this.onNoteAdd()
        })
        
        saveNote.addEventListener('click', () => {
            const updatedTitle = noteTitle.value.trim();
            const updatedBody = noteBody.value.trim();

            this.onNoteEdit(updatedTitle,updatedBody)
        })
        //Hide note preview by default
        this.updatePreviewVisibility(false)
    }
    _createNote(id,title,body,updated){
        
        const MAX_LENGTH = 80;

        return `
            <div class="note" data-note-id="${id}">
                <h3 class="note-title">${title}</h3>
                <p class="note-body">
                    ${body.substring(0, MAX_LENGTH)}
                    ${body.length > MAX_LENGTH ? "...": ""}
                </p>
                <small class="note-timestamp">
                    ${updated.toLocaleString(undefined, { dateStyle: "full" , timeStyle: "short"})}
                </small>
                <button id="${"delete"+id}" class="action-button delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button id="${ "edit" + id}" class="action-button edit"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            </div>
        `
    }
    updateNoteList(notes){
        const list = this.root.querySelector(".noteList")
        
        list.innerHTML = ""

        for(const note of notes){
            const html = this._createNote(note.id,note.title,note.body,new Date(note.updated))
            list.insertAdjacentHTML("beforeend", html)
        }

        list.querySelectorAll(".note").forEach(note => {
            const btnEdit = this.root.querySelector(`#${ "edit" + note.dataset.noteId}`);
            const btndelete = this.root.querySelector(`#${ "delete" + note.dataset.noteId}`);

            btnEdit.addEventListener('click',()=>{
                this.onNoteSelectEdit(note.dataset.noteId)

            });
            note.addEventListener('click',()=>{
                this.onNoteSelect(note.dataset.noteId)
            })
            btndelete.addEventListener('click',()=>{
                const shouldDelete = confirm("Are you sure you wish to delete this note?")
                if(shouldDelete)
                this.onNoteDelete(note.dataset.noteId)

            });
        })

    }
    updateActiveNote(note){
        this.root.querySelectorAll(".note").forEach(note =>{
            note.classList.remove("selected")
        })
        this.root.querySelector(`.note[data-note-id="${note.id}"]`).classList.add("selected")
    }
    updateActiveNoteEdit(note){
        this.root.querySelector(".noteTitleInput").value = note.title
        this.root.querySelector(".noteBodyInput").value = note.body
    }
    updatePreviewVisibility(visible){
        this.root.querySelector(".notesPreview").style.visibility = visible ? "visible" : "hidden";
    }
}