module.exports = {
     INSERT_QUERY : "INSERT INTO users (email, name, password, joined) VALUES ($1, $2, $3, $4)",
     SELECT_EMAIL : "SELECT * FROM USERS WHERE email = $1 ",
     INSERT_REFRESH_TOKEN : "UPDATE users SET refreshToken = $1 where id = $2 ",
     GET_ACCESS_TOKEN: "SELECT * FROM USERS WHERE refreshToken = $1"

}
