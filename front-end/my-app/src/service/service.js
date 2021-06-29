import axios from 'axios';
import { REGISTER_URL, LOGIN_URL, ACCESS_TOKEN_URL, YOUR_HOME_URL, LOGOUT_URL } from './endPoint';
class Service {
    

    constructor(){
        this.response = null
    }
    /**
     * @description send post request to the back-end.
     * @param {*} data contain username, email, and password
     * @return {*} data contain username, email, and password
     
     */
    async register(data){
        const headers = {
              "Content-Type": "application/json" 
        }
        try {
            //axios.post accept two parameters: (URL, Data);
             this.response = await axios.post(REGISTER_URL, data, headers);
            //  response = await axios.post('https://jsonplaceholder.typicode.com/posts');
        } catch (error) {
            console.log(error);
        }
        return this.response;
    }

    async login(data){
        let response = null;
        const headers = {
              "Content-Type": "application/json" 
        }
        try {
            //axios.post accept two parameters: (URL, Data);
             this.response = await axios.post(LOGIN_URL, data, headers);
            //  response = await axios.post('https://jsonplaceholder.typicode.com/posts');
        } catch (error) {
            console.log(error);
        }
        return this.response ;
    }

    async getAccessToken(refreshToken){

        const data = {
            token: refreshToken
        }
        try {
              //axios.post accept two parameters: (URL, Data);
             this.response  = await axios.post(ACCESS_TOKEN_URL, data);
          
        } catch (error) {
             console.log(error);
        }
        return this.response ;
    }

    async fetchRoute(token){
     
            // { headers: {"Authorization" : `Bearer ${token}`} }
        try {
              //axios.post accept two parameters: (URL, Data);
            this.response  = await axios.get(YOUR_HOME_URL, { headers: {"authorization" : `Bearer ${token}`} });
            return this.response;
        } catch (error) {
            console.log(error);
      
        }
        return this.response ;
    }

 
    async fetchLogoutRoute(refreshToken){
        console.log("lgout");

        const data = {
            token: refreshToken
        }
        try {
              //axios.post accept two parameters: (URL, Data);
             this.response = await axios.post(LOGOUT_URL, data);
          
        } catch (error) {
             console.log(error);
        }
        return this.response;
    }
}

 export default new Service();
