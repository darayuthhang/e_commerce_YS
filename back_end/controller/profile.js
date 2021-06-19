require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const service = require("../service/service");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const jwt = require("jsonwebtoken");

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

const Logout = async (req, res) => {
    const {token} = req.body;
    if(myCache.has(token)){
        myCache.del(token)
        return res.status(200).json({
            "message":"successfully",
            "success":true
        });
    }
    return res.status(404).json({
            "message":"not success",
            "success":false
        });

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
                        const accessToken = await generateAccessToken(user)
                        const refreshToken = await jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                        myCache.set(refreshToken, refreshToken);
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
    const users = await service.getAllusers();
    const data = {
        users: users?.rows[0]
    }
    return res.status(200).json({success: true, testData:data});
}

const getAccessToken = async (req, res) => {
    let refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401)
    //select item from db
    if(myCache.has(refreshToken)){
        const user  = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken =  await generateAccessToken({id: user.id});
        return res.status(200).json({accessToken: accessToken});
    }
    return res.status(404).json("not found");
     
}

//***** we will take of these later  ************/
async function generateAccessToken(user) {
  return await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

module.exports ={
    Register:Register,
    Login:Login,
    YourStoreHome:YourStoreHome,
    getAccessToken:getAccessToken,
    Logout: Logout
}
