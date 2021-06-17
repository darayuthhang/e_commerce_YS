import React, {useState} from 'react';
import './login.css';
import service from '../../service/service';
const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

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
            if(refreshToken === null || refreshToken === "undefined"){
                alert("refreshToken does not exist")
            }else{
                //store refresh token in local storage.
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
