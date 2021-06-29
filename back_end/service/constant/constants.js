
const USER_TABLE = "users";
const REFRESH_TOKEN_TABLE = "refresh_token";

module.exports = {
     INSERT_QUERY : `INSERT INTO ${USER_TABLE} (email, name, password, joined) VALUES ($1, $2, $3, $4)`,
     SELECT_EMAIL : `SELECT * FROM ${USER_TABLE} WHERE email = $1 `,
     INSERT_REFRESH_TOKEN : `INSERT INTO ${REFRESH_TOKEN_TABLE} (token) VALUES ($1)`,
     GET_ACCESS_TOKEN: "SELECT * FROM USERS WHERE refreshToken = $1",
     SELECT_ALL_USERS: "SELECT * FROM USERS",
     DELETE_TOKEN_BY_TOKEN: `DELETE FROM ${REFRESH_TOKEN_TABLE} WHERE token = $1 RETURNING token`,
     GET_ACCESS_TOKEN: `SELECT token FROM ${REFRESH_TOKEN_TABLE} WHERE token = $1`,


}
