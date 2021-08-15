import {useState, useEffect} from 'react';


//Get and display question
function Question(props){
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);

    useEffect(function(){
        async function getQuestion(){
            var res = await fetch('http://localhost:3001/questions');
            var data = await res.json();

            //Generate random number between: 0 and data.length
                const min = 0;
                const max = data.length;
                const rnd = parseInt(min + Math.random() * (max - min));

            const questions = data;
            //Creates array of incorrect and correct
                answers[0] = questions[rnd].correct;
                answers[1] = questions[rnd].incorrect[0];
                answers[2] = questions[rnd].incorrect[1];
                answers[3] = questions[rnd].incorrect[2];

            console.log(answers);
            shuffle(answers);
            console.log(answers);

            console.log("Pravilni odgovor: " + questions[rnd].correct)

            if(res.status === 200){ 
                setQuestion(questions[rnd]);
            }

        }
        getQuestion();
    }, []);

    //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffle(array){
        var currentIndex = array.length,  randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    return(
        <div>
         <p key={question._id}>Question: {question.question}</p>
         <p>
            {answers.map((answer) => (
                <label>
                    <input key={question._id} type="radio" value="neki" name="neki"/> {answer}
                </label>
                
            ))}

         </p>
         
         
        </div>
    )
}

export default Question;