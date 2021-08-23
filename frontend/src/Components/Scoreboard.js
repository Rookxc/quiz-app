import {useState, useEffect} from 'react';

import Button from './Button'
import ButtonLight from './ButtonLight2'


function Scoreboard(props){
    const [dataByScore, setDataByScore] = useState([]);
    const [dataByCorrect, setDataByCorrect] = useState([]);
    const [dataByTime, setDataByTime] = useState([]);
    const [dataByToday, setDataByToday] = useState([]);
    const [dataByAllTime, setDataByAllTime] = useState([]);
    const [dataByThisHour, setDataByThisHour] = useState([]);

    const [whichSort, setWhichSort] = useState([]);

    useEffect(function(){
        
    }, []);

    //OK
    function formatDate (date) {
        date = new Date(date);
        var ret = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + " " + (date.getHours() + 1) + ":" + (date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes());
        return ret;
    }

    //OK
    async function getDataByScore(){
        setWhichSort("score");
        var res = await fetch('http://localhost:3001/play/score');
        var data = await res.json();

        setDataByScore(data);
    }

    //OK
    async function getDataByCorrect(){
        setWhichSort("correct");
        var res = await fetch('http://localhost:3001/play/correct');
        var data = await res.json();
        
        setDataByCorrect(data);
    }

    //OK
    async function getDataByTime(){
        setWhichSort("time");
        var res = await fetch('http://localhost:3001/play/time');
        var data = await res.json();
        
        setDataByTime(data);
    }

    //OK
    async function getDataToday(){
        setWhichSort("today");
        var res = await fetch('http://localhost:3001/play/today');
        var data = await res.json();
  
        setDataByToday(data);
    }

    //OK
    async function getDataAllTime(){
        setWhichSort("alltime");
        var res = await fetch('http://localhost:3001/play/');
        var data = await res.json();

        setDataByAllTime(data);
    }

    //OK
    async function getDataThisHour(){
        setWhichSort("thishour");
        var res = await fetch('http://localhost:3001/play/thishour');
        var data = await res.json();

        setDataByThisHour(data);
    }


    if(whichSort == "score"){
        return(
            <div>
                <Button text="Sort by score" onClick={getDataByScore}></Button>
                <Button text="Most correct" onClick={getDataByCorrect}></Button>
                <Button text="Fastest time" onClick={getDataByTime}></Button>
                <ButtonLight text="Today" onClick={getDataToday}></ButtonLight>
                <ButtonLight text="This hour" onClick={getDataThisHour}></ButtonLight>
                <ButtonLight text="All time" onClick={getDataAllTime}></ButtonLight>

                {dataByScore.map((data) => (
                    <div key={data._id} className="row d-flex justify-content-center w-100">
                        <div className="col-md-6" style={{ marginTop: "20px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>
                            <h5 style={{marginTop: "10px"}}>Score: <b>{data.score}</b>  by user <b>{data.userID.username}</b></h5>
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
                <ButtonLight text="This hour" onClick={getDataThisHour}></ButtonLight>
                <ButtonLight text="All time" onClick={getDataAllTime}></ButtonLight>

                
                {dataByCorrect.map((data) => (
                    <div key={data._id} className="row d-flex justify-content-center w-100">
                        <div className="col-md-6"  style={{ marginTop: "20px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>
                            <h5 style={{marginTop: "10px"}}>Correct: <b>{data.correct}</b> by user {data.userID.username}</h5>
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
                <ButtonLight text="This hour" onClick={getDataThisHour}></ButtonLight>
                <ButtonLight text="All time" onClick={getDataAllTime}></ButtonLight>

                {dataByTime.map((data) => (
                    <div key={data._id} className="row d-flex justify-content-center w-100">
                        <div style={{ marginTop: "20px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>
                                <h5 style={{marginTop: "10px"}}>Time: <b>{data.playTime}</b>  by user <b>{data.userID.username}</b></h5>
                        </div>
                    </div>      
                ))}

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
                <ButtonLight text="This hour" onClick={getDataThisHour}></ButtonLight>
                <ButtonLight text="All time" onClick={getDataAllTime}></ButtonLight>

                {dataByToday.map((data) => (
                    <div key={data._id} className="row d-flex justify-content-center w-100">
                        <div style={{ marginTop: "20px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>
                                <h5 style={{marginTop: "10px"}}>Score: <b>{data.score}</b>  by user <b>{data.userID.username}</b> by date <b>{formatDate(data.startingTime)}</b></h5>
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
                <ButtonLight text="This hour" onClick={getDataThisHour}></ButtonLight>
                <ButtonLight text="All time" onClick={getDataAllTime}></ButtonLight>

                {dataByAllTime.map((data) => (
                            <div key={data._id} className="row d-flex justify-content-center w-100">
                                <div className="col-md-6" style={{ marginTop: "20px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>
                                    <h5 style={{marginTop: "10px"}}>Score: <b>{data.score}</b>  by user <b>{data.userID.username}</b> by date <b>{formatDate(data.startingTime)}</b></h5>
                                </div>
                            </div>      
                        ))}
            </div>
        )
    }
    else if(whichSort == "thishour"){
        return(
            <div>
                <Button text="Sort by score" onClick={getDataByScore}></Button>
                <Button text="Most correct" onClick={getDataByCorrect}></Button>
                <Button text="Fastest time" onClick={getDataByTime}></Button>
                <ButtonLight text="Today" onClick={getDataToday}></ButtonLight>
                <ButtonLight text="This hour" onClick={getDataThisHour}></ButtonLight>
                <ButtonLight text="All time" onClick={getDataAllTime}></ButtonLight>

                {dataByThisHour.map((data) => (
                    <div key={data._id} className="row d-flex justify-content-center w-100">
                        <div  className="col-md-6" style={{ marginTop: "20px", backgroundColor: "lightGray", padding: "30px", borderRadius:"35px", borderColor: "#6e7985", borderStyle: "solid", borderWidth: "10px"}}>
                            <h5 style={{marginTop: "10px"}}>Score: <b>{data.score}</b>  by user <b>{data.userID.username}</b> by date <b>{formatDate(data.startingTime)}</b></h5>
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
                <ButtonLight text="This hour" onClick={getDataThisHour}></ButtonLight>
                <ButtonLight text="All time" onClick={getDataAllTime}></ButtonLight>
            </div>      
        )              
    }
    
}

export default Scoreboard;