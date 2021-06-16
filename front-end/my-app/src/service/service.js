import axios from 'axios';
import { REGISTER_URL } from './endPoint';
class Service {

    /**
     * @description send post request to the back-end.
     * @param {*} data contain username, email, and password
     * @return {*} data contain username, email, and password
     
     */
    async register(data){
        console.log(data);
        let response = {};
        const headers = {
           
              "Content-Type": "application/json"
            
        }
        try {
            //axios.post accept two parameters: (URL, Data);
             response = await axios.post("http://localhost:3000/register", data, headers);
            //  response = await axios.post('https://jsonplaceholder.typicode.com/posts');
        } catch (error) {
            console.log(error);
        }
        return response;
    }
}

 export default new Service();
