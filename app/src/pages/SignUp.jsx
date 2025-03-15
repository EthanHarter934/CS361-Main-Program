import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");

    var navigate = useNavigate();

    var handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    var handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    var handleSubmit = () => {
        fetch("http://localhost:3003/newUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/");
            })
    };
    
    return (
    <div class="Home">
        <div class="login">
            <h1>Sign Up</h1>
            <div class="login-field">
                <label>Username</label> <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
            </div>
            <div class="login-field">
                <label>Password</label> <input type="text" name="password" value={password} onChange={handlePasswordChange}/>
            </div>
            <div class="login-buttons">
                <button class="login-button" onClick={handleSubmit}>Sign Up</button>
            </div>
        </div>
    </div>
    );
}

export default SignUp;