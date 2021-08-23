import Button from "./Button";
import {useState, useEffect} from 'react';

function Navigation(props){
  const [isAdmin, setIsAdmin] = useState();

  async function getUser(){
      var userID = localStorage.getItem("userID");
      var res = await fetch('http://localhost:3001/users/' + userID);

      var data = await res.json();

      if(data.admin == true){
          setIsAdmin(true);
      }
  }

  getUser();

  if(isAdmin == true){
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Quizify</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">  
              <li className="nav-item active">
                <a className="nav-link" href="/practice">Practice</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/play">Play</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/profile">Profile</a>
              </li>
  
              <li className="nav-item active">
                <a className="nav-link active" href="/scoreboard">Scoreboard</a>
              </li>

              <li className="nav-item disabled">
                <a className="nav-link disabled" href="/admin">Super secret admin panel</a>
              </li>
            </ul>
          </div>
      </nav>
    )

  }


  if(localStorage.getItem("loggedIn") === "false"){
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Quizify</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/practice">Practice</a>
              </li>
              
              <li className="nav-item active">
                <a className="nav-link" href="/register">Register</a>
              </li> 
  
              <li className="nav-item active">
                <a className="nav-link" href="/login">Login</a>
              </li>
  
              <li className="nav-item disabled">
                <a className="nav-link disabled" href="/scoreboard">Scoreboard</a>
              </li>
            </ul>
          </div>
      </nav>
      )
  }
  else{
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Quizify</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">  
              <li className="nav-item active">
                <a className="nav-link" href="/practice">Practice</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/play">Play</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/profile">Profile</a>
              </li>
  
              <li className="nav-item disabled">
                <a className="nav-link disabled" href="/scoreboard">Scoreboard</a>
              </li>
            </ul>
          </div>
      </nav>
    )
  }
  
}

export default Navigation;