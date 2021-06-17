require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {pool} = require("../config/db");
const jwt = require("jsonwebtoken");
const { useStore } = require('react-redux');
// CREATE TABLE users (
//   ID SERIAL PRIMARY KEY,
//   email text UNIQUE NOT Null,
//   name VARCHAR(255),
//   entries BIGINT DEFAULT 0,
//   password VARCHAR(255),
//   joined TIMESTAMP NOT NULL
// );

const Register = async (req, res) => {
    const {email, name, password} = req.body;
    if(email && name && password){
        const INSERT_QUERY = "INSERT INTO users (email, name, password, joined) VALUES ($1, $2, $3, $4)";
        try {
            //hash password
            let hashPassword = await bcrypt.hash(password, saltRounds);
                //if hashpassword success
            if(hashPassword){
                 const items = await pool.query(INSERT_QUERY, [email, name, hashPassword, new Date()]);
              
            }
        } catch (error) {
            console.error(error.message);
            return res.status(404).json("register not success");
        }
        return res.status(200).json("success");
    }
   return res.status(404).json("user not found");
}

const Login = async (req, res) => {
    const { email, password} = req.body;
    console.log(email, password);
    if(email && password){
   
        try {
            //select item from db
            const SELECT_EMAIL = "SELECT email, password, id FROM USERS WHERE email = $1 ";
            const users = await pool.query(SELECT_EMAIL, [email])
            //if use exist, access the row, else throw error;
            const rowOfUsers = users?.rows;
            for(let row =0 ; row < rowOfUsers.length; row++){
                const passExist = await bcrypt.compare(password, rowOfUsers[row].password);
                if(passExist){
                    const accessToken = generateAccessToken(rowOfUsers[row].id)
                    const refreshToken = jwt.sign({user_id: rowOfUsers[row].id}, process.env.REFRESH_TOKEN_SECRET)
                    return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken })
                } 
            }
        } catch (error) {
        
             console.error(error.message);
            return res.status(404).json("user not success");
        }
    }
    return res.status(404).json("forbidden");
}


//***** we will take of these later  ************/
function generateAccessToken(id) {
  return jwt.sign({user_id:id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
module.exports ={
    Register:Register,
    Login:Login
}
