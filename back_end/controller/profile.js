const bcrypt = require('bcrypt');
const saltRounds = 10;
const {pool} = require("../config/db");

const Register = async (req, res) => {
    const {email, name, password} = req.body;
    if(email && name && password){
        const INSERT_QUERY = "INSERT INTO users (email, name, password) VALUES ($1, $2, $3)";
        try {
            //hash password
            let hashPassword = await bcrypt.hash(password, saltRounds);
            console.log("success register");
                //if hashpassword success
            if(hashPassword){
                 const items = await pool.query(INSERT_QUERY, [email, name, hashPassword]);
              
            }
        } catch (error) {
            console.error(error.message);
            return res.status(404).json("register not success");
        }
        return res.status(200).json("success");
    }
   return res.status(404).json("user not found");
}

module.exports ={
    Register:Register
}
