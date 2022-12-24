import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
function GetANote() {
    const { id } = useParams();
    const naviagte = useNavigate();
    const [warning, setwarning] = useState("")
    const [new_note, setnew_note] = useState({
        title : "",
        note : ""
      })
      const user = useSelector(state => state.user)
      const navigate = useNavigate();
      useEffect(() => {
        if(user.user_name === null){
          navigate('/');
        }
        fetchData();
      },[])
      const fetchData = ()=>{
          fetch(`api/get_a_note/${id}`,{
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            }}).then(resposne=>resposne.json())
            .then(d1=>{
              setnew_note({
                title:d1.title,
                note:d1.note
            })
            })
            
      }
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
      
      const handleSubmit = (e)=>{
        e.preventDefault();
        let d = {
          title:new_note.title,
          note:new_note.note,
        }
        fetch(`api/update_note/${id}`,{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
        body:JSON.stringify(d)}).then(response=>response.json())
        .then(d1=>{
          if(d1.status === 'done')  navigate('/all_note');
          else{
            setwarning('Unable to Update Note')
          }
        })
      }
      const handleDelete = ()=>{
        fetch(`http://127.0.0.1:8000/api/delete_a_note/${id}`);
        naviagte('/all_note')
      }
  return (
    <>
      <form className='mx-auto my-5' style={{ width: "18rem" }}>

        <h3 className='text-center my-2'>Edit Note</h3>
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
          <button type="m-2 submit" onClick={handleDelete} className="btn btn-danger">Delete this note</button>
          <p className="text-danger">{warning}</p>
        </p>
      </form>
    </>
  )
}

export default GetANote