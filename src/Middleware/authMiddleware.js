const jwt = require('jsonwebtoken');
//JWT is an authentication method

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt; // store the jwt in a cookie. to not send the jwt in the headers whenever I make a request to the Api
    
  // check json web token exists & is verified
  //function verify btrg3 decoded token w btakhod two paramters token string w el public/secret key
  if (token) {
    jwt.verify(token, 'secret', (err, decodedToken) => {
      if (err) {
   
        res.status(401).json({message:"You are not logged in."})

      } else {
        console.log(decodedToken);
        next();// next user
      }
    });
  } else {
    res.status(401).json({message:"You are not logged in."})
  }
};


module.exports = { requireAuth };
