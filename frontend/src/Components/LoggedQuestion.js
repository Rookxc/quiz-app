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

    useEffect(function(){
         getQuestion();
    }, []);

    async function getQuestion(){
        console.log("KAJ " +  questionCount);
        if(questionCount == 5){
            console.log("KONC!");
        }
        setQuestionCount(questionCount+1);

        setDisable(false);
        setStatus("🖐");

        var res = await fetch('http://localhost:3001/play/getten');
        //await fetch('http://localhost:3001/questions/krompir');

        var data = await res.json();
        const questions = data.tenQuestionArray;
        JSON.stringify(questions)
        //console.log("kurwa?");
        //console.log(JSON.stringify(questions));
        //Generate random number between: 0 and 10
            // const min = 0;
            // const max = 10;
            // const rnd = parseInt(min + Math.random() * (max - min));
            // console.log("RND " + data.length);
        
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
        console.log("Pravilni odgovor: " + questions[questionCount].correct)
        

        if(res.status === 200){ 
            console.log("STEVILKA " + questionCount)
            setQuestion(questions[questionCount]);
        }
        console.log("TOLEs?");
        console.log(question);
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