import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm, SubmitHandler } from "react-hook-form"
import { createNote, updateNote } from '../network/notes_api';
import { Note } from '../model/noteModel';

interface hooktype {
    title : string;
    text : string
}

interface propsStyle {
  noteToEdit ?: Note,
    onDismiss : () => void,
    onSaveNote : (note : any ) => void

}





const AddEditNoteDialog = ({ noteToEdit,  onDismiss,onSaveNote }: propsStyle) => {

  console.log("add edit noe", noteToEdit);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<hooktype>({
        defaultValues : {
          title : noteToEdit?.title || "",
          text : noteToEdit?.text || ""
        }
      }) 


const onSubmit = async(data : hooktype ) => {
    try {

      let noteResponse: any;

      if(noteToEdit){
        noteResponse = await updateNote(noteToEdit._id, data);
      }else {
         noteResponse = await createNote(data)
      
        onSaveNote(data)
      }
        
    } catch (error) {
        console.log(error);
    }
    console.log("data", data);
}

  return (
    <Modal show onHide={onDismiss}>
    <Modal.Header closeButton>
      <Modal.Title>

        {
          noteToEdit ? "Edit modal" : "Add data"
        }
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="enter your title"  {...register("title",{ required: true }) }  />
        {errors.title && <span>title required</span>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Text</Form.Label>
        <Form.Control type="text" placeholder="enter your Text" {...register("text",{ required: true })}  />
        {errors.text && <span>This field is required</span>}
      </Form.Group>

      <Button type='submit' variant="primary">
        Save Changes
      </Button>
    </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onDismiss}>
        Close
      </Button>
     
    </Modal.Footer>
  </Modal>
  );
};

export default AddEditNoteDialog
