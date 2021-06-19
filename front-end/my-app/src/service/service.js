import axios from 'axios';
import { REGISTER_URL, LOGIN_URL, ACCESS_TOKEN_URL, YOUR_HOME_URL, LOGOUT_URL } from './endPoint';
class Service {

    /**
     * @description send post request to the back-end.
     * @param {*} data contain username, email, and password
     * @return {*} data contain username, email, and password
     
     */
    async register(data){
        let response = {};
        const headers = {
              "Content-Type": "application/json" 
        }
        try {
            //axios.post accept two parameters: (URL, Data);
             response = await axios.post(REGISTER_URL, data, headers);
            //  response = await axios.post('https://jsonplaceholder.typicode.com/posts');
        } catch (error) {
            console.log(error);
        }
        return response;
    }

    async login(data){
        let response = {};
        const headers = {
              "Content-Type": "application/json" 
        }
        try {
            //axios.post accept two parameters: (URL, Data);
             response = await axios.post(LOGIN_URL, data, headers);
            //  response = await axios.post('https://jsonplaceholder.typicode.com/posts');
        } catch (error) {
            console.log(error);
        }
        return response;
    }

    async getAccessToken(refreshToken){
        let response = {};
        const data = {
            token: refreshToken
        }
        try {
              //axios.post accept two parameters: (URL, Data);
             response = await axios.post(ACCESS_TOKEN_URL, data);
          
        } catch (error) {
             console.log(error);
        }
        return response;
    }

    async fetchRoute(token){
        let response = {};
            // { headers: {"Authorization" : `Bearer ${token}`} }
        try {
              //axios.post accept two parameters: (URL, Data);
             response = await axios.get(YOUR_HOME_URL, { headers: {"Authorization" : `Bearer ${token}`} });
   
        } catch (error) {
             console.log(error);
        }
        return response;
    }

 
    async fetchLogoutRoute(refreshToken){
        console.log("lgout");
        let response = {};
        const data = {
            token: refreshToken
        }
        try {
              //axios.post accept two parameters: (URL, Data);
             response = await axios.post(LOGOUT_URL, data);
          
        } catch (error) {
             console.log(error);
        }
        return response;
    }
}

 export default new Service();
