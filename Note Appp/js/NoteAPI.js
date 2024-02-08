export default class NoteAPI{
    static getNotes(){
        const notes = JSON.parse(localStorage.getItem("notes__list") || [])
        return notes.sort((a,b)=>{
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1
        })
    }
    static saveNotes(noteToSave){
        const notes = NoteAPI.getNotes()

        const existing = notes.find(note => note.id == noteToSave.id)

        if(existing){
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        }
        else{
            noteToSave.id = Math.floor(Math.random() * 100000)
            noteToSave.updated = new Date().toISOString()
            notes.push(noteToSave)
        }
        localStorage.setItem("notes__list",JSON.stringify(notes))
    
    }
    static deleteNotes(id){
        const notes = NoteAPI.getNotes();
        const newNotes = notes.filter(note => note.id != id)
        localStorage.setItem("notes__list", JSON.stringify(newNotes))
    }
}