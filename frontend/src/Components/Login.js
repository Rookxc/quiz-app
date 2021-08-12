import {useState} from 'react';

import Button from './Button'

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function Login(e){
        e.preventDefault();
        const res = await fetch('http://localhost:3001/users/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });

        const data = await res.json();
        setUsername("");
        setPassword("");
    }


    return(
        <div style={{width: "400px", margin: "30px", position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -50%)'}}>
            <form className="form-group " onSubmit={Login}>
                <h2 style={{marginBottom: "30px"}}> Login </h2>
                <input
                    style={{marginBottom: "15px"}}
                    type="text"
                    className="form-control "
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                    setUsername(e.target.value);
                    }}
                />
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                    setPassword(e.target.value);
                    }}
                />
                <Button text="Login"/>    
            </form>
        </div> 
    )
}

export default Login;