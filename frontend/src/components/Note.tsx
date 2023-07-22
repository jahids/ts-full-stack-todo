import React from 'react';
import { Note as noteModel } from '../model/noteModel';
import { AiFillDelete } from 'react-icons/ai';


interface NoteProps {
    data : noteModel,
    onDelete : (data : string) => void,
    onNoteClicked : (data : noteModel) => void
}


const Note = ({data, onDelete, onNoteClicked} : NoteProps ) => {
    const {
        text,
        title,
        updatedAt,
        _id,
        createdAt
    } = data



  
    return (
        <div className="col" onClick={()=>onNoteClicked(data)}>
    <div className='card h-100'>
    <img src="https://cdn.mos.cms.futurecdn.net/bc9ddeb0ac9152fe0bdaa50faf475434.jpg" className="card-img-top" alt="..."/>
    <div className="card-body">
      <div className='d-flex justify-content-evenly align-items-center'>
      <h5 className="card-title">{title}</h5>
       <AiFillDelete onClick = {()=>onDelete(_id)} />
      </div>
     
      <p className="card-text">{text}</p>
    </div>
    <div className="card-footer d-flex justify-content-evenly">
      <small className="text-muted">update {updatedAt}</small>
      <small className="text-muted">create {createdAt}</small>
    </div>
    </div>
    
  </div>


    );
};

export default Note;