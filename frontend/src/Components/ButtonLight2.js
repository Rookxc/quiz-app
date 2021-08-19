function ButtonLight2(props){
    return(
        <button style={{margin: "15px", width: "200px", borderColor: "darkgray"}}  className="btn btn-light" onClick={props.onClick}>{props.text}</button>
    )
}

export default ButtonLight2;