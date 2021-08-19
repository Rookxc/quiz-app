import {useState, useEffect} from 'react';

import Button from './Button'


function Scoreboard(props){
    const [dataByScore, setDataByScore] = useState([]);
    const [dataByCorrect, setDataByCorrect] = useState([]);

    const [whichSort, setWhichSort] = useState([]);

    useEffect(function(){
        
    }, []);

    async function getDataByScore(){
        setWhichSort("score");
        var res = await fetch('http://localhost:3001/play/score');
        var data = await res.json();
        JSON.stringify(data)
        setDataByScore(data);

        //console.log(JSON.stringify(data));
    }
    
    async function getDataByCorrect(){
        setWhichSort("correct");
        var res = await fetch('http://localhost:3001/play/correct');
        var data = await res.json();
        JSON.stringify(data)
        setDataByCorrect(data);

        //console.log(JSON.stringify(data));
    }

    async function getDataByTime(){
        setWhichSort("time");
    }


    if(whichSort == "score"){
        return(
            <div>
                <Button text="Sort by score" onClick={getDataByScore}></Button>
                <Button text="Most correct" onClick={getDataByCorrect}></Button>
                <Button text="Fastest time"></Button>
    
                {dataByScore.map((data) => (
                            <div>
                                <div style={{ marginTop: "20px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>
                                    <h5 style={{marginTop: "10px"}}>Score: <b>{data.score}</b></h5>
                                </div>
                            </div>      
                        ))}
            </div>
        )
    }   
    else if(whichSort == "correct"){
        return(
            <div>
                 <Button text="Sort by score" onClick={getDataByScore}></Button>
                <Button text="Most correct" onClick={getDataByCorrect}></Button>
                <Button text="Fastest time"></Button>
    
                {dataByCorrect.map((data) => (
                            <div>
                                <div style={{ marginTop: "20px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>
                                    <h5 style={{marginTop: "10px"}}>Correct: <b>{data.correct}</b></h5>
                                </div>
                            </div>      
                        ))}
            </div>
        )
    }
    else if(whichSort == "time"){
        return(
            <div>

            </div>
        )
    }
    else{
        return(
            <div>
               <Button text="Sort by score" onClick={getDataByScore}></Button>
                <Button text="Most correct" onClick={getDataByCorrect}></Button>
                <Button text="Fastest time"></Button>
            </div>      
        )              
    }
    
}

export default Scoreboard;