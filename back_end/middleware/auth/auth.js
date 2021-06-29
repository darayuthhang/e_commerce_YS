const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization']
  console.log('header does not exist' + authHeader);
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token);
  if (token === null) return res.status(404).json("forbidden");

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
