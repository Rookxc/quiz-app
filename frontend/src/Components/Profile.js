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
    const [plays, setPlays] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [newUser, setNewUser] = useState();

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
        console.log(data);

        if(data.message == "Error when getting play."){
            setNewUser(true);
        }

        JSON.stringify(data);
        setPlays(data);
    }

    function formatDate (date) {
        date = new Date(date);
        var ret = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + " " + (date.getHours() + 1) + ":" + (date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes());
        return ret;
    }

    async function getQuestions(id){
        var res = await fetch('http://localhost:3001/play/' + id);
        var data = await res.json();
        setQuestions(data.questions); 
        setAnswers(data.correctAnswers);      
    }

    if(newUser == true){
        return(
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <div style={{ marginTop: "60px", backgroundColor: "#abb2ba", padding: "30px", borderRadius:"35px", borderColor: "#343a40", borderStyle: "solid", borderWidth: "10px"}}>
                        <p style={{marginTop: "30px"}}>Username: <b>{username}</b></p>
                        <p>Email: <b>{email}</b></p>
                        <Button text="Logout" onClick={Logout}></Button>
                    </div>
                </div>
            </div>
        )    
    }
    else{
        return(
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <div style={{ marginTop: "60px", backgroundColor: "#abb2ba", padding: "30px", borderRadius:"35px", borderColor: "#343a40", borderStyle: "solid", borderWidth: "10px"}}>
                        <p style={{marginTop: "30px"}}>Username: <b>{username}</b></p>
                        <p>Email: <b>{email}</b></p>
                        <Button text="Logout" onClick={Logout}></Button>
                    </div>

                    {plays.map((play) => (
                        <div key={play._id}>
                            <div style={{ marginTop: "20px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>
                                <h5 style={{marginTop: "10px"}}>Date: <b>{formatDate(play.startingTime)}</b></h5>
                                <p style={{marginTop: "10px"}}>Incorrect answers: <b>{play.incorrect}</b></p>
                                <p style={{marginTop: "10px"}}>Correct answers: <b>{play.correct}</b></p>
                                <p style={{marginTop: "10px"}}>Score: <b>{Math.round(play.score).toFixed(2)}</b></p> 
                                <Button text="Questions" onClick={() => getQuestions(play._id)}></Button>
                            </div>
                            
                        </div>      
                    ))}

                    <div style={{ marginTop: "20px", backgroundColor: "#abb2ba", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>               
                    <h2 style={{marginBottom: "10px"}}>Questions: </h2>
                        {questions.map((question) => (          
                                <div>                   
                                    <p> {question}</p>
                                </div>   
                                                       
                        ))}
                    </div> 

                    <div style={{ marginTop: "20px", backgroundColor: "#aae6a8", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>               
                    <h2 style={{marginBottom: "10px"}}>Answers: </h2>
                        {answers.map((answer) => (          
                                <div>                   
                                    <p> {answer}</p>
                                </div>                                 
                        ))}
                    </div> 

                                        
                </div>    
            </div>
    )
        }
        }
   
    

export default Profile;