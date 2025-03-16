import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    // Declare all states
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");

    // Initialize page navigation
    var navigate = useNavigate();

    var handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    var handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Send a new user request with the username and password from the input fields
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
                // Save the returned user data to the local storage
                localStorage.setItem("user", JSON.stringify(data));

                // Navigate back to the home page
                navigate("/");
            })
    };
    
    // Display sign up form
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