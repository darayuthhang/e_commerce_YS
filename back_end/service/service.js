const {pool} = require("../config/db");
const constants = require("./constant/constants");


module.exports = {
    async insertUser(user){
        await pool.query(constants.INSERT_QUERY, [user.email, user.name, user.password, new Date()]);
    },
    async getUser(email){
        const users = await pool.query(constants.SELECT_EMAIL, [email])
        return users;
    },
    async insertRefreshTokenIntoRefreshTokenTABLE(refreshToken){
         await pool.query(constants.INSERT_REFRESH_TOKEN, [refreshToken]);
    },
    async getAccessToken(refreshToken){
        const users = await pool.query(constants.GET_ACCESS_TOKEN, [refreshToken]);
        return users;
    },
    async getAllusers(){
        const users = await pool.query(constants.SELECT_ALL_USERS);
        return users;
    },
     async deleteToken(accessToken){
//(projectname, productname, em, unitforcast, ack, timezone, userid) VALUES($1, $2, $3, $4, $5, $6, $7)`
        const token = await pool.query(constants.DELETE_TOKEN_BY_TOKEN, [accessToken]);
        return token;
     },
    
}
