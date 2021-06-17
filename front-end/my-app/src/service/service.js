import axios from 'axios';
import { REGISTER_URL, LOGIN_URL } from './endPoint';
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
}

 export default new Service();
