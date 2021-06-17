require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const service = require("../service/service");
// const {pool} = require("../config/db");
const jwt = require("jsonwebtoken");
// CREATE TABLE users (
//   ID SERIAL PRIMARY KEY,
//   email text UNIQUE NOT Null,
//   name VARCHAR(255),
//   entries BIGINT DEFAULT 0,
//   refreshToken VARCHAR(255) DEFAULT "",
//   password VARCHAR(255),
//   joined TIMESTAMP NOT NULL
// );

const Register = async (req, res) => {
    const {email, name, password} = req.body;
    if(email && name && password){
        try {
            //hash password
            let hashPassword = await bcrypt.hash(password, saltRounds);
                //if hashpassword success
            if(hashPassword){
                 const user = {
                     email:email,
                     name:name,
                     password:hashPassword
                 }
                 await service.insertUser(user);
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
    if(email && password){
        try {
            //select item from db
            const users = await service.getUser(email)
            //if use exist, access the row, else throw error;
            const rowOfUsers = users?.rows;
            if(rowOfUsers !== null || rowOfUsers !== "undefined"){
                for(let row =0 ; row < rowOfUsers.length; row++){
                    const passExist = await bcrypt.compare(password, rowOfUsers[row].password);
                    if(passExist){
                        const accessToken = generateAccessToken(rowOfUsers[row].id)
                        const refreshToken = jwt.sign({user_id: rowOfUsers[row].id}, process.env.REFRESH_TOKEN_SECRET)
                        //insert refreshtoken with id
                        await service.insertRefreshTokenIntoUser(refreshToken, rowOfUsers[row].id);
                        return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken })
                    } 
                }
            }
          
        } catch (error) {
            console.log(error.message);
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
