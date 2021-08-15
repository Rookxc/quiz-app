import {BrowserRouter, Route } from 'react-router-dom';
import './App.css';

//Components
import Login from './Components/Login';
import Register from './Components/Register';
import Navigation from './Components/Navigation';
import LandingPage from './Components/LandingPage';
import Practice from './Components/Practice';
import Profile from './Components/Profile';

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
      </div>
    </BrowserRouter>
  );
}

export default App;
