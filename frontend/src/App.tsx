import { useState, useEffect } from 'react';
import { Note as Notemodel } from './model/noteModel';
import Note from './components/Note';
import { deleteNote, fetchAllNotes, updateNote } from './network/notes_api';
import AddEditNoteDialog from './components/AddEditNoteDialog';

const App= () => {

  const [note, setNote] = useState<Notemodel[]>([])
  const [dialogbox, setdialogbox] = useState(false)
  const [noteToEdit, setnoteToEdit] = useState<Notemodel|null>(null)

  console.log("app tsx",noteToEdit);

   
  useEffect(() => {
    const loadData = async() => {
      try {
       const apidata = await fetchAllNotes()
         setNote(apidata)
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, [])


  const handleDelete = async (id : string) => {
      try {
        const deltedata = await deleteNote(id)
        console.log("delte", deltedata);
        setNote(note.filter((item)=>item._id !== id));
      } catch (error) {
        console.log(error)
      }
  }
  

return (
<>
<button onClick={()=>setdialogbox(true)}>
  add
</button>
<div className="row row-cols-1 row-cols-lg-4 row-cols-md-3 g-4 p-5">
 {
 note.map((item)=>(
        <Note 
        data ={item} 
        onDelete={handleDelete}
        onNoteClicked={setnoteToEdit}
        />
      ))
}
</div>
{
  dialogbox &&
   <AddEditNoteDialog 
   onDismiss={()=>setdialogbox(false)}
   onSaveNote = { (newNOte)=>{
    setNote([...note,newNOte])
    setdialogbox(false)
   }}
   />
 
}


{
  noteToEdit &&
  <AddEditNoteDialog
   noteToEdit={noteToEdit}
   onDismiss={()=>setnoteToEdit(null)}
   onSaveNote={(updateNote)=>{
  setNote(note.map((item)=>item._id === updateNote._id ?updateNote:item))
    setnoteToEdit(null)
   }}
  />
}

</>

  );
};

export default App;