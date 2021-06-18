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
            if(rowOfUsers !== null || rowOfUsers !== undefined){
                for(let row =0 ; row < rowOfUsers.length; row++){
                    const passExist = await bcrypt.compare(password, rowOfUsers[row].password);
                    if(passExist){
                        const user = {id:rowOfUsers[row].id}
                        const accessToken = generateAccessToken(user)
                        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
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

const YourStoreHome = async (req, res) => {
    return res.status(200).json("Success");
}

const getAccessToken = async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401)
    //select item from db
    const users = await service.getAccessToken(refreshToken)
    const refreshTokenExist = users?.rows[0]?.refreshtoken;
 
    if(refreshTokenExist === null || refreshTokenExist === undefined){
       return res.status(401).json("forbidden");
    }
    if(refreshToken === refreshTokenExist){
        const user  = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken =  generateAccessToken({id: user.id});
        return res.status(200).json({accessToken: accessToken});
    }
    return res.status(404).json("not found");
     
}

//***** we will take of these later  ************/
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

module.exports ={
    Register:Register,
    Login:Login,
    YourStoreHome:YourStoreHome,
    getAccessToken:getAccessToken
}
