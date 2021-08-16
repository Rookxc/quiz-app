import {useState, useEffect} from 'react';

import ButtonLight from './ButtonLight'
import Button from './Button'

//Get and display question
function Question(props){
    const [question, setQuestion] = useState('');
    const [status, setStatus] = useState('');
    const [disable, setDisable] = useState('');
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [answers, setAnswers] = useState([]);
   
    useEffect(function(){
         getQuestion();
    }, []);

    async function getQuestion(){
        setDisable(false);
        setStatus("");

        var res = await fetch('http://localhost:3001/questions');
        var data = await res.json();
        const questions = data;

        //Generate random number between: 0 and data.length
            const min = 0;
            const max = data.length;
            const rnd = parseInt(min + Math.random() * (max - min));

        //Checks if there are only 2 possible answers
            if(questions[rnd].correct == "True" || questions[rnd].correct == "False"){
                answers[0] = questions[rnd].correct;
                answers[1] = questions[rnd].incorrect[0];
            }
            else{
                answers[0] = questions[rnd].correct;
                answers[1] = questions[rnd].incorrect[0];
                answers[2] = questions[rnd].incorrect[1];
                answers[3] = questions[rnd].incorrect[2];
            }

        shuffle(answers);
        console.log("Pravilni odgovor: " + questions[rnd].correct)

        if(res.status === 200){ 
            setQuestion(questions[rnd]);
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
            setStatus("Correct");
        }
        else{
            setIncorrectCount(incorrectCount+1);
            setStatus("Incorrect");
        }

        setDisable(true);
    }

    async function handleChange(e){
        userAnswers = e.target.value;
    }


    return(
        <div style={{width: "500px", margin: "30px", position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -50%)', backgroundColor: "#343a40", padding: "30px", borderRadius:"35px"}}>
        <p key={question._id} style={{color: 'white'}} ><b>{question.question}</b></p>
        <p>
            {answers.map((answer) => (
                <label style={{margin: "15px", color: 'white'}}>
                    <input style={{color: 'white'}} key={question._id} type="radio" value={answer} onChange={handleChange}/> {answer}
                </label>
                
            ))}
        </p>
        <ButtonLight text="Check answer" onClick={CheckAnswer} disabled={disable}></ButtonLight>  
        <ButtonLight text="Next Question" onClick={getQuestion}></ButtonLight>

        <h2 style={{margin: "15px", color: 'gray'}}>{status}</h2>  
        <h5 style={{margin: "15px", color: 'gray'}}>Correct answers count: {correctCount}</h5>
        <h5 style={{margin: "15px", color: 'gray'}}>Incorrect answers count: {incorrectCount}</h5>
        </div>
    )
}

export default Question;