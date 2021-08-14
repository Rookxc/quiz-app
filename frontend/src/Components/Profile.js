import {useState, useEffect} from 'react';
import Button from './Button'

function Profile(props){ 
    return(
        <div>
           <p>Username: <b>{localStorage.getItem("username")}</b></p>
           <p>Email: <b>{localStorage.getItem("email")}</b></p>
           <Button text="Odjava"></Button>
        </div>
    )
}

export default Profile;