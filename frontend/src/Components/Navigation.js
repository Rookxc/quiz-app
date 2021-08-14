import Button from "./Button";

function Logout(){
  localStorage.setItem("loggedIn", false);
  localStorage.setItem("username", "");
  window.location.href = "/";
}


function Navigation(props){
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
                <a className="nav-link" href="/profile">Profile</a>
              </li>
  
              <li className="nav-item disabled">
                <a className="nav-link disabled" href="/scoreboard">Scoreboard</a>
              </li>
              <li className="nav-item disabled">
                <Button text="Logout" onClick={Logout}></Button>
              </li>
            </ul>
          </div>
      </nav>
    )
  }
  
}

export default Navigation;