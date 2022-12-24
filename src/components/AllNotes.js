import React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SingleShowNote from './SingleShowNote'
import { useState } from 'react'
import { useSelector } from 'react-redux'
function AllNotes() {
  const [all_notes, setall_notes] = useState([]);
  const user = useSelector(state => state.user)
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user.user_name === null) {
      navigate("/");
    }

    fetchAllNotes();
  }, [])
  let fetchAllNotes = async () => {
    let d = {
      'user_name': user.user_name,
      'password':user.password
    }
    const resposne = await fetch('api/get_all_data', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(d)
    })
    const d1 = await resposne.json();
    setall_notes(d1);
  }
  
  return (
    <div>
      <div className="text-center mt-3">
        <Link to="/new_note" className="btn btn-primary">
          Write A New Note
        </Link>
      </div>
      <div className='text-center mt-2'>
        <div className="container text-center">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">

            {
              all_notes.map(data => <div className="col mt-4">
                <Link to = {`/get_a_note/${data.id}`} style={{
                  "text-decoration":"none","color":"black"
                }}><SingleShowNote note={data.note.substr(0,40)} created_at={data.created_at} title={data.title} /></Link>
              </div>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllNotes