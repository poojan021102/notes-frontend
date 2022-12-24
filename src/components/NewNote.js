import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SingleShowNote from './SingleShowNote'
import { useState } from 'react'
import { useSelector } from 'react-redux'
function NewNote() {
    const [new_note, setnew_note] = useState({
        title : "",
        note : ""
      })
      const user = useSelector(state => state.user)
      const navigate = useNavigate();
      const handleNewTitle = (e)=>{
        setnew_note({
          title:e.target.value,
          note:new_note.note
        })
      }
      const handleNewNote = (e)=>{
        setnew_note({
          note:e.target.value,
          title:new_note.title
        })
      }
      let modalBody = ()=>{
        return(
          <div className=''>
            Title
            <input type="text" value={new_note.title} onChange={handleNewTitle}/>
            Note
            <input type="text" value={new_note.note} onChange={handleNewNote} />
          </div>
        )
      }
      
      const handleSubmit = async(e)=>{
        e.preventDefault();
        let d = {
          user_name:user.user_name,
          title:new_note.title,
          note:new_note.note,
          password:user.password,
        }
        const resposne = await fetch('api/create_new_note',{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
        body:JSON.stringify(d)})
          const d1 = await resposne.json();
          navigate('/all_note');
      }
      
  return (
    <>
      <form className='mx-auto my-5' style={{ width: "18rem" }}>

        <h3 className='text-center my-2'>Write A New Note</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
          <input type="text" value={new_note.title} onChange={handleNewTitle} className="form-control" id="" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Write Your Note Here</label>
          <textarea type="text" value={new_note.note} onChange={handleNewNote} className="form-control" id="" />
        </div>
        <div className="mb-3 form-check">
        </div>
        <p className='text-center'>
            <Link className='m-2 btn btn-secondary' to="/all_note">Back</Link>
          <button type="m-2 submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </p>
      </form>
    </>
  )
}

export default NewNote