import {BrowserRouter, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';
import './App.css';

//Components
import Login from './Components/Login';
import Register from './Components/Register';
import Navigation from './Components/Navigation';
import LandingPage from './Components/LandingPage';
import Practice from './Components/Practice';
import Profile from './Components/Profile';

function App() {
  const [username, setUsername] = useState([]);

  useEffect(function(){
    const getUser = async function(){
      const res = await fetch('http://localhost:3001/users');
      const data = await res.json();
      console.log(data);
      setUsername(data[0].username);
    }
    getUser();
    setUsername("");
  }, []);


  return (
    <BrowserRouter>
     <div className="App">
      <Route path="/" exact>
        <Navigation/>
        <LandingPage/>
      </Route>
      <Route path="/login">
        <Navigation/>
        <Login/>
      </Route>
      <Route path="/register">
        <Navigation/>
        <Register/>
      </Route>
      <Route path="/practice">
        <Navigation/>
        <Practice/>
      </Route>
      <Route path="/profile">
        <Profile username={username}/>
      </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
