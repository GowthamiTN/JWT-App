const jwt=require("jsonwebtoken");
require("dotenv").config();
const config=process.env;

const verifyToken=(req,res,next)=>{
    const token=req.body.token || req.query.token ||  req.params.token || req.headers["x-access-token"];
    if(!token)
    {
        return res.status(403).send("A token is required for authentication");    
    }
    try{
        console.log(config.TOKEN_KEY);
        console.log(token);
        const decoded=jwt.verify(token,config.TOKEN_KEY);
        req.user=decoded;
    } catch(err){
        console.log(err);
        return res.status(401).send("Inavlid Token");
    }
    return next();
};
module.exports= verifyToken;