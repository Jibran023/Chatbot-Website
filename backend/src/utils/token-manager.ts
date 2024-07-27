import jwt from 'jsonwebtoken'

export const createToken = (id:string, email:string, expiresIn:string) => {
    const payload = {id, email}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn,}) // from env file, the JWT secret key is something we made ourselves
    // we have set the expiry date for 7 days in user-controller
    return token
} 

