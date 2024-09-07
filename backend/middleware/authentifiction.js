const jwt = require('jsonwebtoken');
const verifyToken = async function isAuthenticated (req, res,next) {        
      if(!req.headers.authorization){
        return res.status(403).send("A token is required for authentication");
      }
       const token = req.headers.authorization.split(' ')[1];
       if (!token) {
        return res.status(403).send("A token is required for authentication");
        }
       jwt.verify(token, "RANDOM_ACCESS_TOKEN",(err,donnesEnvoyes)=>
       {
        if(err){
       
            return res.status(401).json(err);
       }else{
            req.utilisateur=donnesEnvoyes;
            next();
       }
 });
};
   module.exports = verifyToken