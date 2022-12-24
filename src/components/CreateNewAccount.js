import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../features/UserDetails/UserDetailsReducer';
import { useNavigate } from 'react-router-dom';
function CreateNewAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setuser] = useState({
    user_name: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  })
  const [warning, setwarning] = useState("");
  let get_user_name = (e) => {
    let d = user;
    d.user_name = e.target.value;
    setuser(d);
  }
  let get_password = (e) => {
    let d = user;
    d.password = e.target.value;
    setuser(d);
  }
  let get_first_name = (e) => {
    let d = user;
    d.first_name = e.target.value;
    setuser(d);
  }
  let get_last_name = (e) => {
    let d = user;
    d.last_name = e.target.value;
    setuser(d);
  }
  let get_email = (e) => {
    let d = user;
    d.email = e.target.value;
    setuser(d);
  }
  let handle_submit = async(e) => {
    e.preventDefault();
    let d = user;
    // fetch(`api/regester_new_user`, {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(d)
    // })
    //   .then((response) => response.json())
    //   .then(data => d1 = data);
      const resposne = await fetch('api/regester_new_user',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      body:JSON.stringify(d)})
        const d1 = await resposne.json();
    if (d1.status === 'created') {
      dispatch(login(user));
      navigate('/all_note')
    }
    else {
      setwarning("User Name already exists");
    }
  }
  return (
    <form className="row g-3 p-5" style={{ width: "" }}>
      <div className="col-md-6">
        <label htmlFor="inputEmail4" className="form-label">User Name</label>
        <input required type="text" onChange={get_user_name} className="form-control" id="inputAddress" />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputPassword4" className="form-label">Password</label>
        <input required type="password" onChange={get_password} className="form-control" id="inputPassword4" />
      </div>
      <div className="col-12">
        <label htmlFor="inputAddress" className="form-label">First Name</label>
        <input type="text" onChange={get_first_name} className="form-control" id="inputAddress" />
      </div>
      <div className="col-12">
        <label htmlFor="inputAddress2" className="form-label">Last Name</label>
        <input type="text" onChange={get_last_name} className="form-control" id="inputAddress2" />
      </div>
      <div className="col-12">
        <label htmlFor="inputEmail4" className="form-label">Email</label>
        <input type="email" onChange={get_email} className="form-control" id="inputEmail4" />
      </div>
      <div className="col-12 text-center">
        <button type="" onClick={handle_submit} className="btn btn-primary">Sign in</button>
      </div>
    </form>
  )
}

export default CreateNewAccount