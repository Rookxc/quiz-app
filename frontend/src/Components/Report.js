import LoggedQuestion from './LoggedQuestion';

function Report(props){
    //Pridobi iz baze podatke! in jih izpisi spodaj!
    return(
    <div>
        <div style={{width: "500px", marginTop: "60px", position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -50%)', 
        backgroundColor: "#343a40", padding: "30px", borderRadius:"35px", borderColor: "gray", borderStyle: "solid", borderWidth: "10px"}}>
            <h1 style={{marginTop: "15px", color: 'gray'}}>🤩 Finished 🤩</h1>
            <h2 style={{marginTop: "15px", color: 'gray'}}>Score: </h2>
            <h2 style={{marginTop: "15px", color: 'gray'}}>Correct answers: </h2>
            <h2 style={{marginTop: "15px", color: 'gray'}}>Incorrect answers: </h2>
            <h2 style={{marginTop: "15px", color: 'gray'}}>Time: </h2>
           
        </div>
    </div>
    )
}

export default Report;