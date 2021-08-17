import {useState, useEffect} from 'react';
import Button from './Button'

function Logout(){
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("userID", "");
    window.location.href = "/";
  }

  
function Profile(props){ 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(function(){
        getUser();
   }, []);

   //Gets user based on his ID (stored in local storage)
   async function getUser(){
        var userID = localStorage.getItem("userID");
        var res = await fetch('http://localhost:3001/users/' + userID);
 
        var data = await res.json();

        setUsername(data.username);
        setEmail(data.email);
   }

    return(
        <div>
           <p>Username: <b>{username}</b></p>
           <p>Email: <b>{email}</b></p>
           <Button text="Logout" onClick={Logout}></Button>
        </div>
    )
}

export default Profile;