const jwt = require('jsonwebtoken')

const verifyJWT = (req,res,next) =>{
    const authHeader = req.headers.Authorization || req.headers.authorization
    if(!authHeader?.startsWith("Bearer ")){
        return res.status(401).json({message:"Unauthorized"})
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
            console.log(err)
            return res.status(403).json({message:"Forbidden"})
        }
        req.email = decoded.email
        req.id = decoded.id
        next()
    })
}

module.exports = verifyJWT