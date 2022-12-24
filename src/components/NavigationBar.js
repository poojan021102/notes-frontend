import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { logout } from '../features/UserDetails/UserDetailsReducer'
function NavigationBar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/all_note">Ultimate Notes</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="#">{user.user_name ? user.user_name : "User Not Logged In"}</a>
              <a className={`nav-link ${user.user_name === null ? 'disabled' : ''}`} onClick = {()=>dispatch(logout())} href = "">Log Out</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBar