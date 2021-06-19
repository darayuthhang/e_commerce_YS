import React, {useState} from 'react';
import './login.css';
import service from '../../service/service';
import { useHistory, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const history = useHistory();

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const onHandleSubmit =  async (e) => {
        e.preventDefault();
        const data = {
            email:email,
            password:password
        }
        const loginSuccess = await service.login(data);
        if(loginSuccess){
            //switch to route
            const refreshToken = loginSuccess?.data?.refreshToken;
            const accessToken = loginSuccess?.data?.accessToken;
       
            if(refreshToken === null || refreshToken === "undefined"){
                alert("refreshToken does not exist")
            }else{
                //store refresh token in local storage.
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                history.push("/YourHome")
            }
        }
    }
    return(
        <div id="form-container">
            
            <form id="login-form" onSubmit={onHandleSubmit}>
              
                <h2>Login</h2>
                <label>Email</label>
                <input type="email" onChange={onChangeEmail}/>
                
                <label>Password</label>
                 <input type="password" onChange={onChangePassword}/>
                 <button>Login</button>
                  <button>Reset password</button>
            </form>
        </div>
    )
}
export default Login;
