import jwt from 'jsonwebtoken';


const authenticate = (req, res, next) => {

    const token = req.headers['authorization'];

    
    if(!token){
        return res.status(401).json({
            message: 'No estas autorizado'
     })   
    }

    try {
        const justToken = token.replace('Bearer ', '');
        const decoded = jwt.verify(justToken, process.env.SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message: 'Token no valido'
        })
    }
}

export { authenticate };