import {useState, useEffect} from 'react';

import Button from './Button'
import ButtonLight from './ButtonLight2'


function Scoreboard(props){
    const [dataByScore, setDataByScore] = useState([]);
    const [dataByCorrect, setDataByCorrect] = useState([]);
    const [dataByToday, setDataByToday] = useState([]);
    const [dataByAllTime, setDataByAllTime] = useState([]);

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
    }

    async function getDataByTime(){
        setWhichSort("time");
    }

    async function getDataToday(){
        setWhichSort("today");
        var res = await fetch('http://localhost:3001/play/today');
        var data = await res.json();
        JSON.stringify(data)
        setDataByToday(data);
        
    }

    async function getDataAllTime(){
        setWhichSort("alltime");
        var res = await fetch('http://localhost:3001/play/');
        var data = await res.json();
        JSON.stringify(data)
        setDataByAllTime(data);
    }

    async function getUserName(userID){
        console.log("USER ID " + userID);
        var res = await fetch('http://localhost:3001/users/' + userID);
        var data = await res.json();
        console.log(data.username);
        return data.username;
    }

    if(whichSort == "score"){
        return(
            <div>
                <Button text="Sort by score" onClick={getDataByScore}></Button>
                <Button text="Most correct" onClick={getDataByCorrect}></Button>
                <Button text="Fastest time" onClick={getDataByTime}></Button>
                <ButtonLight text="Today" onClick={getDataToday}></ButtonLight>
                <ButtonLight text="This week" onClick={getDataToday}></ButtonLight>
                <ButtonLight text="All time" onClick={getDataAllTime}></ButtonLight>

                {dataByScore.map((data) => (
                            <div>
                                <div style={{ marginTop: "20px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>
                                    <h5 style={{marginTop: "10px"}}>Score: <b>{data.score}</b>  by user {data.userID}</h5>
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
                <Button text="Fastest time" onClick={getDataByTime}></Button>
                <ButtonLight text="Today" onClick={getDataToday}></ButtonLight>
                <ButtonLight text="This week" onClick={getDataToday}></ButtonLight>
                <ButtonLight text="All time" onClick={getDataAllTime}></ButtonLight>
    
                {dataByCorrect.map((data) => (
                            <div>
                                <div style={{ marginTop: "20px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>
                                    <h5 style={{marginTop: "10px"}}>Correct: <b>{data.correct}</b> by user {data.userID}</h5>
                                </div>
                            </div>      
                        ))}
            </div>
        )
    }
    else if(whichSort == "time"){
        return(
            <div>
              <Button text="Sort by score" onClick={getDataByScore}></Button>
                <Button text="Most correct" onClick={getDataByCorrect}></Button>
                <Button text="Fastest time" onClick={getDataByTime}></Button>
                <ButtonLight text="Today" onClick={getDataToday}></ButtonLight>
                <ButtonLight text="This week" onClick={getDataToday}></ButtonLight>
                <ButtonLight text="All time" onClick={getDataAllTime}></ButtonLight>

                <h3 style={{marginTop: "70px"}}>This feature is not yet done! :(</h3>

            </div>
        )
    }
    else if(whichSort == "today"){
        return(
            <div>
               <Button text="Sort by score" onClick={getDataByScore}></Button>
                <Button text="Most correct" onClick={getDataByCorrect}></Button>
                <Button text="Fastest time" onClick={getDataByTime}></Button>
                <ButtonLight text="Today" onClick={getDataToday}></ButtonLight>
                <ButtonLight text="This week" onClick={getDataToday}></ButtonLight>
                <ButtonLight text="All time" onClick={getDataAllTime}></ButtonLight>

                {dataByToday.map((data) => (
                            <div>
                                <div style={{ marginTop: "20px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>
                                    <h5 style={{marginTop: "10px"}}>Score: <b>{data.score}</b>  by user <b>{data.userID}</b> by date <b>{data.startingTime}</b></h5>
                                </div>
                            </div>      
                        ))}
            </div>
        )
    }
    else if(whichSort == "alltime"){
        return(
            <div>
               <Button text="Sort by score" onClick={getDataByScore}></Button>
                <Button text="Most correct" onClick={getDataByCorrect}></Button>
                <Button text="Fastest time" onClick={getDataByTime}></Button>
                <ButtonLight text="Today" onClick={getDataToday}></ButtonLight>
                <ButtonLight text="This week" onClick={getDataToday}></ButtonLight>
                <ButtonLight text="All time" onClick={getDataAllTime}></ButtonLight>

                {dataByAllTime.map((data) => (
                            <div>
                                <div style={{ marginTop: "20px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>
                                    <h5 style={{marginTop: "10px"}}>Score: <b>{data.score}</b>  by user <b>{data.userID}</b> by date <b>{data.startingTime}</b></h5>
                                </div>
                            </div>      
                        ))}
            </div>
        )
    }
    else{
        return(
            <div>
               <Button text="Sort by score" onClick={getDataByScore}></Button>
                <Button text="Most correct" onClick={getDataByCorrect}></Button>
                <Button text="Fastest time" onClick={getDataByTime}></Button>
                <ButtonLight text="Today" onClick={getDataToday}></ButtonLight>
                <ButtonLight text="This week" onClick={getDataToday}></ButtonLight>
                <ButtonLight text="All time" onClick={getDataAllTime}></ButtonLight>
                
            </div>      
        )              
    }
    
}

export default Scoreboard;