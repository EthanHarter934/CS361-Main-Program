import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");
    var [error, setError] = useState("");

    var navigate = useNavigate();

    var handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    var handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    var handleSubmit = () => {
        fetch("http://localhost:3003/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    localStorage.setItem("user", JSON.stringify(data));
                    setError("");
                    navigate("/");
                }
            })
    };

    var handleSignUp = () => {
        navigate("/signup");
    }
    
    return (
    <div class="Home">
        <div class="login">
            <h1>Login</h1>
            <div class="login-field">
                <label>Username</label> <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
            </div>
            <div class="login-field">
                <label>Password</label> <input type="text" name="password" value={password} onChange={handlePasswordChange}/>
            </div>
            <div class="login-buttons">
                <button class="login-button" onClick={handleSubmit}>Login</button>
                <button class="login-button" onClick={handleSignUp}>Sign Up</button>
            </div>
            <p>{error}</p>
        </div>
    </div>
    );
}

export default Login;