import Button from './Button'
import {useState} from 'react';

function Admin(){
    const [question, setQuestion] = useState('');
    const [questionID, setQuestionID] = useState('');
    const [correct, setCorrect] = useState('');
    const [incorrect1, setIncorrect1] = useState('');
    const [incorrect2, setIncorrect2] = useState('');
    const [incorrect3, setIncorrect3] = useState('');

    async function Insert(){
        console.log("Question: " + question);
        console.log("Correct: " + correct);
        console.log("Incorrect1: " + incorrect1);
        console.log("Incorrect2: " + incorrect2);
        console.log("Incorrect3: " + incorrect3);

        var ARRAY = new Array(0);

        ARRAY.push(incorrect1, incorrect2, incorrect3);

        const res = await fetch('http://localhost:3001/questions/', {
            method: 'POST',
            credentials: 'include',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                question: question,
                correct: correct,
                incorrect: ARRAY
            })
        })

        var status = await res.status;
        var data = null;
        
       
        if(status === 201){
            data = await res.json();
            console.log("Success!");
        }
        else{
            console.log("Didn't send");
        }

        setQuestion("");
        setCorrect("");
        setIncorrect1("");
        setIncorrect2("");
        setIncorrect3("");
    }

    async function Delete(){
        if (window.confirm('Are you sure you wish to delete this item? (ID: ' + questionID + ')')){
            const res = await fetch('http://localhost:3001/questions/' + questionID, {
                method: 'DELETE',
                credentials: 'include',
                headers:{
                    'Content-type': 'application/json'
                },
            })
    
            var status = await res.status;
            var data = null;
           
            if(status === 201){
                data = await res.json();
                console.log("Success!");
            }
            else{
                console.log("Didn't delete");
            }
        }
        else{
            console.log("Do nothing :)");
        }
       
        setQuestionID("");
    }

    async function GetData(e){
        e.preventDefault();
        var ARRAY = new Array(0);
        var data;
        const res = await fetch('http://localhost:3001/questions/' + questionID, {
            method: 'GET',
            credentials: 'include',
            headers:{
                'Content-type': 'application/json'
            },
        }).then(async response => {
            data = await response.json();
        });

        setQuestion(data.question);
        setCorrect(data.correct);
        setIncorrect1(data.incorrect[0]);
        setIncorrect2(data.incorrect[1]);
        setIncorrect3(data.incorrect[2]);
    }

    async function Update(){    
        var ARRAY = new Array(0);

        ARRAY.push(incorrect1, incorrect2, incorrect3);

        const res = await fetch('http://localhost:3001/questions/' + questionID, {
            method: 'PUT',
            credentials: 'include',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                question: question,
                correct: correct,
                incorrect: ARRAY
            })
        })

        var status = await res.status;
        var data = null;
        
       
        if(status === 201){
            data = await res.json();
            console.log("Success!");
        }
        else{
            console.log("Didn't update");
        }

        setQuestion("");
        setCorrect("");
        setIncorrect1("");
        setIncorrect2("");
        setIncorrect3("");
    }

    return(
        <div>     
            <div className="row d-flex justify-content-center">
                <form className="col-md-4" onSubmit={Insert}>
                    <h2 style={{marginTop:"50px", marginBottom: "25px"}}>Add question </h2>
                        <input
                            style={{marginBottom: "15px"}}
                            required={true}
                            type="text"
                            className="form-control "
                            name="question"
                            placeholder="Question"
                            value={question}
                            onChange={(e) => {
                                setQuestion(e.target.value);
                            }}
                        />
                        <input
                            style={{marginBottom: "15px"}}
                            required={true}
                            type="text"
                            className="form-control"
                            name="correct"
                            placeholder="Correct answer"
                            value={correct}
                            onChange={(e) => {
                                setCorrect(e.target.value);
                            }}
                        />
                        <input
                            style={{marginBottom: "15px"}}
                            required={true}
                            type="text"
                            className="form-control"
                            name="incorrect1"
                            placeholder="Incorrect answer (1)"
                            value={incorrect1}
                            onChange={(e) => {
                                setIncorrect1(e.target.value);
                            }}
                        />
                        <input
                            style={{marginBottom: "15px"}}
                            required={true}
                            type="text"
                            className="form-control"
                            name="incorrect2"
                            placeholder="Incorrect answer (2)"
                            value={incorrect2}
                            onChange={(e) => {
                                setIncorrect2(e.target.value);
                            }}
                        />
                        <input
                            style={{marginBottom: "15px"}}
                            required={true}
                            type="text"
                            className="form-control"
                            name="incorrect3"
                            placeholder="Incorrect answer (3)"
                            value={incorrect3}
                            onChange={(e) => {
                                setIncorrect3(e.target.value);
                            }}
                        />
                    <Button text="Add"/>    
                </form>
            </div>
            <hr></hr>
            
            <div className="row d-flex justify-content-center">
                <form className="col-md-4" onSubmit={Delete}>
                    <h2 style={{marginTop:"25px", marginBottom: "25px"}}>Delete question </h2>
                        <input
                            style={{marginBottom: "15px"}}
                            required={true}
                            type="text"
                            className="form-control "
                            name="question"
                            placeholder="ID"
                            value={questionID}
                            onChange={(e) => {
                                setQuestionID(e.target.value);
                            }}
                        />
                    <Button text="Delete"/>    
                </form>
            </div>
            <hr></hr>

            <div className="row d-flex justify-content-center">
                <form className="col-md-4" onSubmit={GetData}>
                    <h2 style={{marginTop:"25px", marginBottom: "25px"}}>Request question </h2>
                        <input
                            style={{marginBottom: "15px"}}
                            type="text"
                            className="form-control "
                            name="questionID"
                            placeholder="ID"
                            required={true}
                            value={questionID}
                            onChange={(e) => {
                                setQuestionID(e.target.value);
                            }}
                        />
                    <Button text="Get data"/>    
                </form>
                <form className="col-md-4" onSubmit={Update}>
                    <h2 style={{marginTop:"25px", marginBottom: "25px"}}>Update question </h2>
                        <input
                            style={{marginBottom: "15px"}}
                            type="text"
                            className="form-control "
                            name="question"
                            placeholder="Question"
                            required={true}
                            value={question}
                            onChange={(e) => {
                                setQuestionID(e.target.value);
                            }}
                        />
                         <input
                            style={{marginBottom: "15px"}}
                            required={true}
                            type="text"
                            className="form-control"
                            name="correct"
                            placeholder="Correct answer"
                            value={correct}
                            onChange={(e) => {
                                setCorrect(e.target.value);
                            }}
                        />
                        <input
                            style={{marginBottom: "15px"}}
                            required={true}
                            type="text"
                            className="form-control"
                            name="incorrect1"
                            placeholder="Incorrect answer (1)"
                            value={incorrect1}
                            onChange={(e) => {
                                setIncorrect1(e.target.value);
                            }}
                        />
                        <input
                            style={{marginBottom: "15px"}}
                            required={true}
                            type="text"
                            className="form-control"
                            name="incorrect2"
                            placeholder="Incorrect answer (2)"
                            value={incorrect2}
                            onChange={(e) => {
                                setIncorrect2(e.target.value);
                            }}
                        />
                        <input
                            style={{marginBottom: "15px"}}
                            required={true}
                            type="text"
                            className="form-control"
                            name="incorrect3"
                            placeholder="Incorrect answer (3)"
                            value={incorrect3}
                            onChange={(e) => {
                                setIncorrect3(e.target.value);
                            }}
                        />
                    <Button text="Update"/>    
                </form>

            </div>
            <hr></hr>
        </div>
    )
}

export default Admin;