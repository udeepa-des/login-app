import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
    const users = [{ username: "Jane", password: "123" }];
    const handleSubmit = (e) => {
        e.preventDefault()
        const account = users.find((user) => user.username === username);
        if (account && account.password === password) {
            setauthenticated(true)
            localStorage.setItem("authenticated", true);
            navigate("/dashboard");
        }
        else{
            setError("Invalid Details...");
        }
    };
    return (
        <div className="login">
            <p className="welcome">Login</p>
            <form onSubmit={handleSubmit}>
                {(error != "") ? ( <div className="error">{error}</div> ) : ""}
                <label for="UsernameLbl" className="UsernameLbl">Name</label>
                <input className="Username"
                    type="text"
                    name="Username"
                    id="Username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                />
                <label for="passLbl" className="passLbl">Password</label>
                <input className="password"
                    type="password"
                    name="Password"
                    id="Password"
                    onChange={(e) => setpassword(e.target.value)}
                />
                <input className="loginBtn" type="submit" value="Login" />
            </form>
        </div>
    )
};

export default Login;