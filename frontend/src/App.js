import {BrowserRouter, Route } from 'react-router-dom';
import './App.css';

//Components
import Login from './Components/Login';
import Register from './Components/Register';
import Navigation from './Components/Navigation';
import LandingPage from './Components/LandingPage';
import Practice from './Components/Practice';
import Profile from './Components/Profile';
import Play from './Components/Play';
import Report from './Components/Report'
import Scoreboard from './Components/Scoreboard'
import Admin from './Components/Admin'


function App() {
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
        <Navigation/>
        <Profile/>
      </Route>
      <Route path="/play">
        <Navigation/>
        <Play/>
      </Route>
      <Route path="/report">
        <Navigation/>
        <Report/>
      </Route>
      <Route path="/scoreboard">
        <Navigation/>
        <Scoreboard/>
      </Route>
      <Route path="/admin">
        <Navigation/>
        <Admin/>
      </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
