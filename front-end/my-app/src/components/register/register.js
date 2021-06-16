import React, {useState} from 'react';
import { useHistory, Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import './register.css';
import { addUser } from '../../redux/action/userAction';
import service from '../../service/service';

const Register = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const users = useSelector(state => state.UserReducer.profile);

  
    const [userName, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const onChangeUserName = (e) => {
        setUsername(e.target.value);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onHandleSubmit =  async (e) => {
        e.preventDefault();
        console.log("success");
        //** model fitting the database backend */
        const Users = {
            name:userName,
            email:email,
            password:password
        }
        const registerExist = await service.register(Users);
        //if user register successfully, dispatch data to redux.
        if(registerExist){
            dispatch(addUser(Users))
        }else{
            alert("Register does not success.");
        }
    }


    return (
        <div id="form-container">
            
            <form id="register-form" onSubmit={onHandleSubmit}>
              
                <h2>Create Account</h2>
                <label>Your name</label>
                 <input type="text" onChange={onChangeUserName}/>

                <label>Email</label>
                <input type="email" onChange={onChangeEmail}/>
                
                <label>Password</label>
                 <input type="password" onChange={onChangePassword}/>
                 <button>Create Account</button>
            </form>
        </div>
    )
}
export default Register;
