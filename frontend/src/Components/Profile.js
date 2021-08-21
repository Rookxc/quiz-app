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

        JSON.stringify(data);
        console.log(data);
        setPlays(data);
    }

   function formatDate (date) {
        date = new Date(date);
        var ret = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + " " + (date.getHours() + 1) + ":" + (date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes());
        return ret;
    }

    return(
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <div style={{ marginTop: "60px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#343a40", borderStyle: "solid", borderWidth: "10px"}}>
                        <p style={{marginTop: "30px"}}>Username: <b>{username}</b></p>
                        <p>Email: <b>{email}</b></p>
                        <Button text="Logout" onClick={Logout}></Button>
                    </div>

                    {plays.map((play) => (
                        <div>
                            <div style={{ marginTop: "20px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>
                                <h5 style={{marginTop: "10px"}}>Date: <b>{formatDate(play.startingTime)}</b></h5>
                                <p style={{marginTop: "10px"}}>Incorrect answers: <b>{play.incorrect}</b></p>
                                <p style={{marginTop: "10px"}}>Correct answers: <b>{play.correct}</b></p>
                                <p style={{marginTop: "10px"}}>Score: <b>{Math.round(play.score).toFixed(2)}</b></p> 
                                <Button text="Questions"></Button>
                            </div>
                        </div>      
                    ))}
                 
                </div>    
            </div>
    )
}

export default Profile;