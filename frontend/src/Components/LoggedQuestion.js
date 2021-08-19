import {useState, useEffect} from 'react';
import ButtonLight from './ButtonLight'


function LoggedQuestion(props){
    const [question, setQuestion] = useState('');
    const [status, setStatus] = useState('');
    const [disable, setDisable] = useState('');
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [answers, setAnswers] = useState([]);

    //var questionCount = 0;
    const [questionCount, setQuestionCount] = useState(0);
    const [startingTime, setStartingTime] = useState();

    //Saves score to database and redirect
    async function saveScore(){
        //Add API url
        const res = await fetch('http://localhost:3001/play/', {
            method: 'POST',
            credentials: 'include',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userID: localStorage.getItem("userID"),
                correct: correctCount,
                incorrect: incorrectCount,
                startingTime: sessionStorage.getItem("starting"),
                endingTime: Date.now(),
                score: 0,
            })
        })

        var status = await res.status;
        var data = null;
        
        if(status === 201){
            data = await res.json();
            console.log("Sucess!");
        }
        else{
            console.log("Didn't send");
        }


        setIncorrectCount(0);
        setCorrectCount(0);

        //Calculate score and save to database
        await fetch('http://localhost:3001/play/calculate/' + data._id);

        window.location.href = "/profile";
    }

    useEffect(function(){
         getQuestion();
         sessionStorage.setItem("starting", Date.now());
         setStartingTime(Date.now());
         console.log(startingTime);
    }, []);

    async function getQuestion(){
        if(questionCount == 10){
            saveScore();       
        }

        setQuestionCount(questionCount+1);

        setDisable(false);
        setStatus("🖐");

        var res = await fetch('http://localhost:3001/play/getten');
        
        var data = await res.json();
        const questions = data.tenQuestionArray;
        JSON.stringify(questions)
        
        //Checks if there are only 2 possible answers
            if(questions[questionCount].correct == "True" || questions[questionCount].correct == "False"){
                answers[0] = questions[questionCount].correct;
                answers[1] = questions[questionCount].incorrect[0];
            }
            else{
                answers[0] = questions[questionCount].correct;
                answers[1] = questions[questionCount].incorrect[0];
                answers[2] = questions[questionCount].incorrect[1];
                answers[3] = questions[questionCount].incorrect[2];
            }

        shuffle(answers);        

        if(res.status === 200){ 
            setQuestion(questions[questionCount]);
        }
    }

    //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffle(array){
        var currentIndex = array.length,  randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    var userAnswers = "";
    
    async function CheckAnswer(){
        console.log(question.correct);
        if(userAnswers == question.correct){
            setCorrectCount(correctCount+1);
            setStatus('👍');
        }
        else{
            setIncorrectCount(incorrectCount+1);
            setStatus('👎');
        }

        setDisable(true);
    }

    async function handleChange(e){
        userAnswers = e.target.value;
    }
    
    return(
        <div>
                <div style={{width: "500px", marginTop: "60px", position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -50%)', 
                backgroundColor: "#343a40", padding: "30px", borderRadius:"35px", borderColor: "gray", borderStyle: "solid", borderWidth: "10px"}}>
                    
                    <p style={{color: 'white'}} ><b>{question.question}</b></p>
                    <p>
                        {answers.map((answer) => (
                            <label style={{margin: "15px", color: 'white'}}>
                                <input style={{color: 'white'}} key={question._id} type="checkbox" value={answer} onChange={handleChange}/> {answer}
                            </label>
                                
                        ))}
                    </p>
                    <ButtonLight text="Check answer" onClick={CheckAnswer} disabled={disable}></ButtonLight>  
                    <ButtonLight text="Next Question" onClick={getQuestion}></ButtonLight>
    
                    {/*<h2 style={{marginTop: "15px", color: 'gray', fontSize: "50px"}}>{status}</h2>  */}
                    <h5 style={{marginTop: "30px", color: 'gray'}}>👍 {correctCount} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 👎 {incorrectCount}</h5>
                    
                </div>
            </div>
    )
}

export default LoggedQuestion;