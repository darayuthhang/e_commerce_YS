const {pool} = require("../config/db");
const constants = require("../constant/constants");

module.exports = {
    async insertUser(user){
        await pool.query(constants.INSERT_QUERY, [user.email, user.name, user.password, new Date()]);
    },
    async getUser(email){
        const users = await pool.query(constants.SELECT_EMAIL, [email])
        return users;
    },
    async insertRefreshTokenIntoUser(refreshToken, id){
         await pool.query(constants.INSERT_REFRESH_TOKEN, [refreshToken, id]);
    }
}
