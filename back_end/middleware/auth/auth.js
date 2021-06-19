const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.status(403).json("forbidden");
    req.user = user
    next()
  })
}


module.exports = {
    requireAuth:requireAuth
}
