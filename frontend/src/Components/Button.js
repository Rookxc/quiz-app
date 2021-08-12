function Button(props){
    return(
        <button style={{marginTop: "15px", width: "200px"}}  className="btn btn-dark" onClick={props.onClick}>{props.text}</button>
    )
}

export default Button;