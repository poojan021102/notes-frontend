import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/UserDetails/UserDetailsReducer';
import { Link } from 'react-router-dom';

function LoginPage() {
  const history = useNavigate();
  const dispatch = useDispatch()
  const [userInfo, setuserInfo] = useState({
    user_name: "",
    password: "",
  });
  const [warning, setwarning] = useState(false);

  useEffect(() => {
    let user_name = null;
    fetch('api/check_user_already_login')
      .then(response => response.json())
      .then(data => user_name = data);
      console.log(user_name)
    if (user_name !== null) {
      let d = {
        user_name: user_name
      }
      fetch(`api/get_already_login_user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(d)
      })
        .then((response) => response.json())
        .then(data => d = data);
      dispatch(login(d));
      history('/all_notes')
    }
  }, [])
  const ManageUserNameInput = (e) => {
    setuserInfo({
      user_name: e.target.value,
      password: userInfo.password
    })
  }
  const ManagePasswordInput = (e) => {
    setuserInfo({
      user_name: userInfo.user_name,
      password: e.target.value
    })
  }
  const submitButtonPressed = (e) => {
    e.preventDefault();
    let d = {
      user_name: userInfo.user_name,
      password: userInfo.password,
    }
    
    fetch(`api/login_user`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'same-origin',
      body: JSON.stringify(d)
    })
      .then((response) => response.json())
      .then(data => {
        console.log(data)
        if (data.status === 'Correct') {
          dispatch(login(userInfo));
          history("/all_note")
        }
        else {
          setwarning(true);
        }
      }
      );
  }

  return (
    <>
      <form className='mx-auto my-5' style={{ width: "18rem" }}>

        <h3 className='text-center my-2'>Login/Create New Account</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
          <input type="text" value={userInfo.user_name} onChange={ManageUserNameInput} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your User Name with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" value={userInfo.password} onChange={ManagePasswordInput} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 form-check">
        </div>
        {
          warning && <h6 className='text-danger text-center'>Invalid Credential</h6>
        }
        <p className='text-center'>
          <button type="submit" onClick={submitButtonPressed} className="btn btn-primary">Submit</button>
        </p>
        <p className='text-center'><Link to='/create_new_account'>Create A new account</Link></p>
      </form>
    </>
  )
}

export default LoginPage