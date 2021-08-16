function ButtonLight(props){
    return(
        <button style={{marginTop: "15px", width: "80%"}}  className="btn btn-light" onClick={props.onClick} disabled={props.disabled}>{props.text}</button>
    )
}

export default ButtonLight;