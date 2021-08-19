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
    const [date, setDate] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [score, setScore] = useState(0);
    const [plays, setPlays] = useState([]);


    useEffect(function(){
        getUser();
        getStats();
   }, []);

   //Gets user based on his ID (stored in local storage)
   async function getUser(){
        var userID = localStorage.getItem("userID");
        var res = await fetch('http://localhost:3001/users/' + userID);
 
        var data = await res.json();

        setUsername(data.username);
        setEmail(data.email);
   }

   async function getStats(){
    var userID = localStorage.getItem("userID");
    var res = await fetch('http://localhost:3001/play/getuser/' + userID);

    var data = await res.json();

    //setDate(data.)
    JSON.stringify(data);
    //setPlays(data.correct);

    //Number of plays:
    //data.length

    console.log(data[0].incorrect);
    setIncorrect(data[0].incorrect);
    console.log("ksks" + incorrect);
   }

    return(
        <div style={{width: "500px", marginTop: "60px", position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -50%)', 
        backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#343a40", borderStyle: "solid", borderWidth: "10px"}}>
           <p style={{marginTop: "30px"}}>Username: <b>{username}</b></p>
           <p>Email: <b>{email}</b></p>
           <Button text="Logout" onClick={Logout}></Button>
        </div>
    )
}

export default Profile;