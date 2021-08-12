import {BrowserRouter, Route } from 'react-router-dom';
import './App.css';

//Components
import Login from './Components/Login';
import Navigation from './Components/Navigation';


function App() {
  return (
    <BrowserRouter>
     <div className="App">
      <Route path="/" exact>
        <Navigation></Navigation>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/register">

      </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
