import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import AllNotes from './components/AllNotes';
import LoginPage from './components/LoginPage';
import { Route, Routes } from "react-router-dom";
import CreateNewAccount from './components/CreateNewAccount';
import NewNote from './components/NewNote';
import GetANote from './components/getANote';
function App() {
  
  
  return (
    <HashRouter>
        <div className='app'>
          <NavigationBar />
          <Routes>
            <Route path='/' exact element={<LoginPage />} />
            <Route path='/all_note' exact element={<AllNotes />}/>
            <Route path='/create_new_account' exact element={<CreateNewAccount />}/>
            <Route path='/new_note' exact element={<NewNote />}/>
            <Route path='/get_a_note/:id' exact element={<GetANote />}/>
          </Routes>
        </div>
    </HashRouter>
  );
}

export default App;
